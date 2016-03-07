Aggregator.EditorImageUploaderComponent = Ember.Component.extend({
  classNames: 'image-resource-upload-container',

  didInsertElement: function(){
    var _this = this;

    this.$().find('.image-add-fake').click(function(event){
      event.preventDefault();
      _this.$().find('.image-add').click();
    });

    this.$().find('.image-add').fileupload({
      url: '/api/v1/images',
      dataType: 'json',
      formData: {
        imageable_type: "Publication",
        imageable_id: _this.get('model.id')
      },
      done: function(e, data){
        var json = _this.get('json');

        _this.setProperties({
          url: data.result.image.url,
          thumb: data.result.image.thumb
        });

        var action_fields = [];
        action_fields.push({key: "body_locked", value: "false"});
        action_fields.push({key: "body_by", value: "null"});
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
        action_fields.push({key: "body_locked", value: "true"});
        action_fields.push({key: "body_by", value: _this.get('session.currentUser.id')});
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
        action_fields.push({key: "body_locked", value: "false"});
        action_fields.push({key: "body_by", value: "null"});
        var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);

        _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
        _this.$().find('.progress .progress-bar').css({'width': '0%'});
      }
    });

    this.$().find('.image-add').bind('fileuploadsubmit', function (e, data) {
      data.formData = {
        imageable_type: "Publication",
        imageable_id: _this.get('model.id')
      };
    });
  }
});
