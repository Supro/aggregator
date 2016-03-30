Aggregator.UsersNewRoute = Ember.Route.extend({
  model: function(params){
    return this.store.createRecord('user');
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
