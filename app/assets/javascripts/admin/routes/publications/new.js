Aggregator.PublicationsNewRoute = Ember.Route.extend({
  model: function(params){
    return this.store.createRecord('publication');
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
