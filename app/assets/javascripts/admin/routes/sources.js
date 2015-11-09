Aggregator.SourcesRoute = Ember.Route.extend({
  model: function(){
    return this.store.query('source', { source_id: null });
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
