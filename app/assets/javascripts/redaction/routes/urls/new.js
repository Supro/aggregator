Aggregator.UrlsNewRoute = Ember.Route.extend({
  model: function(params){
    return this.store.createRecord('url');
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
