Aggregator.PublicationsNewRoute = Ember.Route.extend({
  queryParams: {
    url: {
      refreshModel: true
    },
    type: {
      refreshModel: true
    }
  },

  model: function(params){
    if (Ember.isPresent(params.type)) {
      var publication = this.store.createRecord('publication', {type: params.type});
      this.store.find('url', params.url).then(function(url){
        publication.get('urls').pushObject(url);
      });
      return publication;
    } else {
      return this.store.createRecord('publication');
    }
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
