Aggregator.PublicationsIndexInnerController = Ember.Controller.extend({
  queryParams: ['type', 'term', 'author_id'],

  type: null,
  author_id: null,
  term: ''
});
