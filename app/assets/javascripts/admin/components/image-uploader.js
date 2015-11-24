Aggregator.ImageUploaderComponent = Ember.Component.extend({
  classNames: 'image-resource-upload-container',

  didInsertElement: function(){
    var _this = this;

    this.$().find('.image-add-fake').click(function(event){
      event.preventDefault();
      _this.$().find('.image-add').click();
    })

    this.$().find('.image-add').fileupload({
      url: '/api/v1/images',
      dataType: 'json',
      //formData: {
      //  posterable_type: 'Item'
      //},
      done: function(e, data){
        _this.store.find('image', data.result.image.id).then(function(image){
          _this.get('model').set('image', image);
        });

        setTimeout(function(){
          _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
          _this.$().find('.progress .progress-bar').css({'width': '0%'});
        }, 1000);
      },
      start: function () {
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
        _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
        _this.$().find('.progress .progress-bar').css({'width': '0%'});
      }
    });

    //this.$().find('.image-add').bind('fileuploadsubmit', function (e, data) {
    //  data.formData = {
    //    imageable_type: _this.get('imageable_type'),
    //    imageable_id: _this.get('imageable_id')
    //  };
    //});
  },

  actions: {
    removeImage: function(){
      this.get('model').set('image', null)
    }
  }
});
