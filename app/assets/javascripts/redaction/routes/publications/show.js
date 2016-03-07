Aggregator.PublicationsShowRoute = Ember.Route.extend({
  model: function(params){
    return this.store.findRecord('publication', params.id, { reload: true });
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
