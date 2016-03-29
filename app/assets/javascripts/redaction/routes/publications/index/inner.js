Aggregator.PublicationsIndexInnerRoute = Ember.Route.extend({
  queryParams: {
    type: {
      refreshModel: true
    },
    state: {
      refreshModel: true
    },
    creator_id: {
      refreshModel: true
    },
    editor_id: {
      refreshModel: true
    },
    writer_id: {
      refreshModel: true
    },
    term: {
      refreshModel: true
    }
  },

  model: function(params){
    return this.store.query('publication', params);
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});
