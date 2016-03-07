Aggregator.SourcesNewRoute = Ember.Route.extend({
  model: function(params){
    return this.store.createRecord('source');
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
