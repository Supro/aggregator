Aggregator.RecommendationsIndexRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
  model: function(){
    return this.store.query('publication', {ids: this.get('settings').get('recommendations')});
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
