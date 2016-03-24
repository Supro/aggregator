Aggregator.UrlsShowRoute = Ember.Route.extend({
  model: function(params){
    return this.store.findRecord('url', params.id, { reload: true });
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
