Aggregator.SourcesRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
  queryParams: {
    term: {
      refreshModel: true
    }
  },

  model: function(params){
    params["source_id"] = null;
    return this.store.query('source', params);
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
