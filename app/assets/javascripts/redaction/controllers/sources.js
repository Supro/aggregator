Aggregator.SourcesController = Ember.Controller.extend({
  queryParams: ['term'],

  termFake: Ember.computed('', function(){
    return this.get('term');
  }),

  termFakeObserver: Ember.observer('termFake', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.set('term', _this.get('termFake'));
    }, 500));
  }),

//  filteredSources: Ember.computed('model.[]', 'titleFilter', function(){
//    var _this = this;
//
//    var sources = this.get('model');
//
//    if (Ember.isPresent(this.get('titleFilter'))) {
//      var regex = new RegExp(this.get('titleFilter'));
//
//      var sources = sources.filter(function(source, index, array){
//        return regex.test(source.get('title')) || regex.test(source.get('url'));
//      });
//    }
//
//    return sources;
//  }),
  loading: false,

  canLoadMore: Ember.computed('model.[]', function(){
    return this.get('model.meta').page < this.get('model.meta').total_pages;
  }),

  actions: {
    getMore: function(){
      this.set('loading', true);

      var _this = this;
      var params = {
        page: this.get('model.meta').page + 1
      };

      this.store.query('source', params).then(function(sources) {
        _this.get('model').set('meta', sources.get('meta'));
        _this.get('model').addObjects(sources.get('content'));
        _this.set('loading', false);
      });
    }
  }
});
