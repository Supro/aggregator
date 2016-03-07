Aggregator.SourcesRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
  model: function(){
    return this.store.query('source', { source_id: null });
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
