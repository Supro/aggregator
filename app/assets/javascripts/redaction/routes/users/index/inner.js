Aggregator.UsersIndexInnerRoute = Ember.Route.extend({
  queryParams: {
    term: {
      refreshModel: true
    }
  },

  model: function(params){
    return this.store.query('user', params);
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
