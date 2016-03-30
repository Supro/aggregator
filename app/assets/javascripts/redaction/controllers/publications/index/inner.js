Aggregator.PublicationsIndexInnerController = Ember.Controller.extend({
  queryParams: ['type', 'term', 'state', 'creator_id', 'editor_id', 'writer_id'],

  type: null,
  state: 'pending',
  creator_id: null,
  editor_id: null,
  writer_id: null,
  term: '',
  loading: false,

  canLoadMore: Ember.computed('model.[]', function(){
    return this.get('model.meta').page < this.get('model.meta').total_pages;
  }),

  actions: {
    getMore: function(){
      this.set('loading', true);

      var _this = this;
      var params = {
        type: this.get('type'),
        state: this.get('state'),
        term: this.get('term'),
        page: this.get('content.meta').page + 1
      };

      this.store.query('publication', params).then(function(publications) {
        _this.get('model').set('meta', publications.get('meta'));
        _this.get('model').addObjects(publications.get('content'));
        _this.set('loading', false);
      });
    }
  }
});
