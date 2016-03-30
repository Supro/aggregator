Aggregator.UsersShowRoute = Ember.Route.extend({
  model: function(params){
    return this.store.findRecord('user', params.id, { reload: true });
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
