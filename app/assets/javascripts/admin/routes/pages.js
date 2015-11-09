Aggregator.PagesRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('category');
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
