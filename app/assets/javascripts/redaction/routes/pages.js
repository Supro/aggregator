Aggregator.PagesRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
  model: function(){
    return this.store.findAll('category');
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
