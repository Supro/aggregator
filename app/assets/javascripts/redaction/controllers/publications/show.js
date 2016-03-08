Aggregator.PublicationsShowController = Ember.Controller.extend({
  isShowingEditor: true,

  actions: {
    toggleEditor: function(){
      this.toggleProperty('isShowingEditor');
    }
  }
});
