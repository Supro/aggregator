Aggregator.PagesShowRoute = Ember.Route.extend({
  model: function(params){
    return this.store.findRecord('category', params.link);
    //_this = this;
    //return new Ember.RSVP.Promise(function(resolve, reject){
    //  _this.store.findRecord('category', params.link).then(function(category){
    //    _this.store.findAll('publication').then(function(publications){
    //      resolve({publications: publications, category: category});
    //    });
    //  });
    //});
  },

  setupController: function(controller, model){
    controller.set('model', model);
    //controller.set('model', model['category']);
    //controller.set('publications', model['publications']);
  }
});
