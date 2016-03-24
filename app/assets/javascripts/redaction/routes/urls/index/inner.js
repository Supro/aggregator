Aggregator.UrlsIndexInnerRoute = Ember.Route.extend({
  queryParams: {
    state: {
      refreshModel: true
    }
  },

  model: function(params){
    return this.store.query('url', params);
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
