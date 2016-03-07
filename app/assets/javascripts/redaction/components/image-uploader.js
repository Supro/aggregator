Aggregator.ImageUploaderComponent = Ember.Component.extend({
  classNames: 'image-resource-upload-container',

  canEdit: Ember.computed('session.currentUser.id', 'locked', 'lockedBy.id', function(){
    if (this.get('locked')) {
      if (this.get('session.currentUser.id') === this.get('lockedBy.id')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }),

  cannotEdit: Ember.computed.equal('canEdit', false),

  didInsertElement: function(){
    var _this = this;

    this.$().find('.image-add-fake').click(function(event){
      event.preventDefault();
      _this.$().find('.image-add').click();
    })

    this.$().find('.image-add').fileupload({
      url: '/api/v1/images',
      dataType: 'json',
      formData: {
        imageable_type: _this.get('imageableType'),
        imageable_id: _this.get('model.id')
      },
      done: function(e, data){
        //_this.store.find('image', data.result.image.id).then(function(image){
          //_this.get('model').set(_this.get('modelField'), image);

        var action_fields = [];
        action_fields.push({key: _this.get('modelField'), value: data.result.image.id.toString()});
        var hash = {name: 'update_image', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);
        //});

        var action_fields = [];
        action_fields.push({key: _this.get('modelField') + "_locked", value: "false"});
        action_fields.push({key: _this.get('modelField') + "_by", value: "null"});
        var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);

        setTimeout(function(){
          _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
          _this.$().find('.progress .progress-bar').css({'width': '0%'});
        }, 1000);
      },
      start: function () {
        var action_fields = [];
        action_fields.push({key: _this.get('modelField') + "_locked", value: "true"});
        action_fields.push({key: _this.get('modelField') + "_by", value: _this.get('session.currentUser.id')});
        var hash = {name: 'lock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);

        _this.$().find('.error').css({'display': 'none'});
        _this.$().find('.progress').css({'opacity': '1', 'display': 'block'});
      },
      progressall: function(e, data){
        _this.$().find('.progress .progress-bar');
        _this.$().find('.progress .progress-bar').css({'width': parseInt(data.loaded / data.total * 100, 10) + '%'});
      },
      fail: function(e, data){
        if (data.jqXHR.responseJSON != undefined) {
          _this.$().find('.error').css({'display': 'block'}).text(data.jqXHR.responseJSON.errors.file[0]);
        } else {
          _this.$().find('.error').css({'display': 'block'}).text('Критическая ошибка');
        }

        var action_fields = [];
        action_fields.push({key: _this.get('modelField') + "_locked", value: "false"});
        action_fields.push({key: _this.get('modelField') + "_by", value: "null"});
        var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);

        _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
        _this.$().find('.progress .progress-bar').css({'width': '0%'});
      }
    });

    this.$().find('.image-add').bind('fileuploadsubmit', function (e, data) {
      data.formData = {
        imageable_type: _this.get('imageableType'),
        imageable_id: _this.get('model.id')
      };
    });
  },

  actions: {
    removeImage: function(){
      var id = this.get('model').get(this.get('modelField')).get('id');
      Ember.$.ajax({
        url: '/api/v1/images/' + id,
        dataType: 'JSON',
        type: "DELETE"
      });

      var action_fields = [];
      action_fields.push({key: this.get('modelField'), value: "null"});
      var hash = {name: 'update_image', user_id: this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      this.get('socket').send(json);
    }
  }
});
