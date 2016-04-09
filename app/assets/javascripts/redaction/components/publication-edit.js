Aggregator.PublicationEditComponent = Ember.Component.extend({
  socket: Ember.computed('socket', function(){
    return new WebSocket("ws://" + window.location.hostname + ":8080/publication_edit/" + this.get('model.id') + "/" + this.get('session.access_token'));
  }),

  didInsertElement: function(){
    var _this = this;
    var socket = this.get('socket');
    var store = this.get('store');

    if(!this.get('model.isVideo')) {
      var stickyHeaderTop = $('.body-edit-buttons').offset().top;
      var stickyCheck = false;
      var stickyHeaderTop2 = $('.watchers').offset().top;
      var stickyCheck2 = false;

      $(window).scroll(function(){
        if($(window).scrollTop() > stickyHeaderTop) {
          if (!stickyCheck) {
            stickyCheck = true
            $('.body-edit-buttons').css({
              position: 'fixed',
              top: '0px',
              right: '0px'
            });
          }
        } else {
          if (stickyCheck) {
            stickyCheck = false
            $('.body-edit-buttons').css({position: 'static', top: '0px'});
          }
        }
      });

      $(window).scroll(function(){
        if($(window).scrollTop() > stickyHeaderTop2) {
          if (!stickyCheck2) {
            stickyCheck2 = true
            $('.watchers').css({
              position: 'fixed',
              top: '0px',
              left: '0px'
            });
          }
        } else {
          if (stickyCheck2) {
            stickyCheck2 = false
            $('.watchers').css({position: 'static', top: '0px'});
          }
        }
      });
    }

    socket.onmessage = function(event) {
      var data = event.data;
      var json = {}

      if (data != "") {
        json = JSON.parse(data);
      }

      if (json.id == parseInt(_this.get('model.id'))) {
        if (json.name == "visit") {
          var users = []

          if (json.users != null) {
            store.query('user', {ids: json.users.map(function(user){ return user.id })}).then(function(users){
              _this.set('model.publicationWatcher.users', users)
            });
          } else {
            //_this.set('model.publicationWatcher.users', [])
          }

        } else if (json.name == "lock_unlock") {
          var publicationLock = _this.get('model.publicationLock');
          json.locks.forEach(function(lock){
            if (/\_locked$/.test(lock.key)) {
              if (lock.value == "false") {
                publicationLock.set(lock.key.camelize(), false);
              } else {
                publicationLock.set(lock.key.camelize(), true);
              }
            } else {
              if (lock.value == "null") {
                publicationLock.set(lock.key.camelize().replace(/By/, 'LockedBy'), null);
              } else {
                store.find('user', lock.value).then(function(user){
                  publicationLock.set(lock.key.camelize().replace(/By/, 'LockedBy'), user);
                });
              }
            }
          });
        } else if (json.name == "update") {
          var publication = _this.get('model');

          json.fields.forEach(function(field){
            if (field.key == "source_id") {
              if (field.value == "null") {
                publication.set('source', null);
              } else {
                store.find('source', field.value).then(function(source){
                  publication.set("source", source);
                });
              }
            } else {
              if (!(json.token===_this.get('session.access_token'))) {
                publication.set(field.key.camelize(), field.value)
              }
            }
          });
        } else if (json.name == "update_image") {
          var publication = _this.get('model');
          json.fields.forEach(function(field){
            if (field.value == "null") {
              publication.set(field.key.camelize(), null);
            } else {
              store.find('image', field.value).then(function(image){
                publication.set(field.key.camelize(), image);
              });
            }
          });
        }
      }

      //store.pushPayload(json);
    };

    socket.onopen = function(event) {
      var hash = {name: 'visit', user_id: parseInt(_this.get('session.currentUser.id'))};

      var json = JSON.stringify(hash);

      _this.get('socket').send(json);
    }

    Ember.$(window).on('beforeunload', function() {
      var action_fields = [];
      var userId = parseInt(_this.get('session.currentUser.id'));
      var publicationLock = _this.get('model.publicationLock');

      if (parseInt(publicationLock.get('titleLockedBy.id')) == userId) {
        action_fields.push({key: "title_by", value: "null"});
        action_fields.push({key: "title_locked", value: "false"});
      }

      if (parseInt(publicationLock.get('subTitleLockedBy.id')) == userId) {
        action_fields.push({key: "sub_title_by", value: "null"});
        action_fields.push({key: "sub_title_locked", value: "false"});
      }

      if (parseInt(publicationLock.get('slugLockedBy.id')) == userId) {
        action_fields.push({key: "slug_by", value: "null"});
        action_fields.push({key: "slug_locked", value: "false"});
      }

      if (parseInt(publicationLock.get('contextLockedBy.id')) == userId) {
        action_fields.push({key: "context_by", value: "null"});
        action_fields.push({key: "context_locked", value: "false"});
      }

      if (parseInt(publicationLock.get('urlLockedBy.id')) == userId) {
        action_fields.push({key: "url_by", value: "null"});
        action_fields.push({key: "url_locked", value: "false"});
      }

      if (parseInt(publicationLock.get('bodyLockedBy.id')) == userId) {
        action_fields.push({key: "body_by", value: "null"});
        action_fields.push({key: "body_locked", value: "false"});
      }

      if (parseInt(publicationLock.get('typeLockedBy.id')) == userId) {
        action_fields.push({key: "type_by", value: "null"});
        action_fields.push({key: "type_locked", value: "false"});
      }

      var hash = {name: 'unlock', user_id: userId, action_fields: action_fields};
      var json = JSON.stringify(hash);

      _this.get('socket').send(json);

      var hash = {name: 'leave', user_id: userId};
      var json = JSON.stringify(hash);

      _this.get('socket').send(json);

      _this.get('socket').close();
    });
  },

  willDestroyElement: function(){
    var hash = {name: 'leave', user_id: parseInt(this.get('session.currentUser.id'))};

    var json = JSON.stringify(hash);

    this.get('socket').send(json);
    this.get('socket').close();
    Ember.$(window).off('beforeunload');
  },

  sourceObserver: Ember.observer('model.url', function(){
    var _this = this;

    if (Ember.isPresent(this.get('model.url')) && !this.get('model.sourceValid')) {
      Ember.$.ajax({
        url: '/api/v1/sources/find_by_link',
        data: {
          link: this.get('model.url')
        },
        success: function(data){
          if (Ember.isPresent(data['errors'])) {
            _this.set('sourceError', data['errors']);
          } else {
            _this.set('sourceError', null);
            _this.store.find('source', data.source.id).then(function(source){
              _this.get('model').set('source', source);
            })
          }
        }
      });
    }
  }),

  sourceError: null,
  gotSourceError: Ember.computed.notEmpty('sourceError'),
  sourceErrorNotFound: Ember.computed.equal('sourceError', "not found"),
  sourceErrorFoundAsParent: Ember.computed.equal('sourceError', "found as parent"),

  actions: {
    addSlide: function(){
      var _this = this, slide = this.store.createRecord('slide', {
        publication: _this.get('model')
      });

      this.get('model.slides').unshiftObject(slide);
    },

    removeSource: function(){
      this.get('model').set('source', null);
      this.set('model.url', null);
    },

    removePublication: function(){
      if (confirm("Вы уверены?")) {
        this.get('model').destroyRecord();
        window.location = "/redaction";
      }
    },

    savePublication: function(){
      var _this = this;

      this.get('model').save().then(function(publication){
        _this.transitionToRoute('publications.index.inner');
      });
    },

    removeSlide: function(slide){
      var _this = this;

      //this.store.findRecord('slide', id).then(function(slide){
        _this.get('model.slides').removeObject(slide);
        slide.set('willDestroy', true);
        _this.get('model.slides').pushObject(slide);
      //});
    }
  }
});
