Aggregator.UrlsIndexInnerController = Ember.Controller.extend({
  queryParams: ['state', 'term'],

  term: '',
  state: 'pending',
  loading: false,

  canLoadMore: Ember.computed('model.[]', function(){
    return this.get('model.meta').page < this.get('model.meta').total_pages;
  }),

  actions: {
    getMore: function(){
      this.set('loading', true);

      var _this = this;
      var params = {
        page: this.get('content.meta').page + 1
      };

      this.store.query('url', params).then(function(urls) {
        _this.get('model').set('meta', urls.get('meta'));
        _this.get('model').addObjects(urls.get('content'));
        _this.set('loading', false);
      });
    }
  }
});
