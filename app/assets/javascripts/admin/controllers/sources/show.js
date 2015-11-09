Aggregator.SourcesShowController = Ember.Controller.extend(Aggregator.SourceFormMixin, {
  actions: {
    saveSource: function(){
      var _this = this;
      this.get('model').save();
    }
  }
});
