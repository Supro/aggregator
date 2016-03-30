Aggregator.UsersIndexInnerController = Ember.Controller.extend({
  queryParams: ['term'],

  term: '',

  canLoadMore: Ember.computed('model.[]', function(){
    return this.get('model.meta').page < this.get('model.meta').total_pages;
  }),

  actions: {
    getMore: function(){
      this.set('loading', true);

      var _this = this;
      var params = {
        term: this.get('term'),
        page: this.get('content.meta').page + 1
      };

      this.store.query('user', params).then(function(users) {
        _this.get('model').set('meta', users.get('meta'));
        _this.get('model').addObjects(users.get('content'));
        _this.set('loading', false);
      });
    }
  }
});
