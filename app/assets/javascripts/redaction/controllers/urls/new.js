Aggregator.UrlsNewController = Ember.Controller.extend({
  actions: {

    saveUrl: function(){
      var _this = this;

      Ember.$.ajax({
        url: 'http://api.fireimp.ru/urls',
        type: "POST",
        data: {
          path: this.get('model.path')
        },
        success: function(data) {
          _this.transitionToRoute('urls.index.inner')
        }
      })
    }
  }
});
