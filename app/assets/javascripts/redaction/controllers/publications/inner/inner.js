Aggregator.PublicationsIndexInnerController = Ember.Controller.extend({
  queryParams: ['type', 'term', 'state', 'creator_id', 'editor_id'],

  type: null,
  state: 'pending',
  creator_id: null,
  editor_id: null,
  term: ''
});
