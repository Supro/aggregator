Aggregator.PublicationEditComponent = Ember.Component.extend({
  socket: Ember.computed('socket', function(){
    return new WebSocket("ws://" + window.location.host + "/api/v1/publication_edit/listen")
  }),

  didInsertElement: function(){
    var model = this.get('model');
    var socket = this.get('socket');
    var store = this.get('store');

    socket.onmessage = function(event) {
      var data = event.data;
      var json = JSON.parse(data);

      store.pushPayload(json);
    };
  },

  willDestoryElement: function(){
    this.get('socket').close();
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
      this.get('model').destroyRecord();
      this.transitionToRoute('publications.index.inner');
    },

    savePublication: function(){
      var _this = this;

      this.get('model').save().then(function(publication){
        publication.reload();
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
