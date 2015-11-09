Aggregator.SourcesShowRoute = Ember.Route.extend({
  model: function(params){
    return this.store.findRecord('source', params.id);
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
