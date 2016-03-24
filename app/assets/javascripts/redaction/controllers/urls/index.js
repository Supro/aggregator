Aggregator.UrlsIndexController = Ember.Controller.extend({
  urlsIndexInnerController: Ember.inject.controller('urls.index.inner'),

  termObserver: Ember.observer('term', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.get('urlsIndexInnerController').set('term', _this.get('term'));
    }, 500));
  }),

  actions: {
    selectState: function(state) {
      if (['pending', 'approved'].contains(state)) {
        this.get('urlsIndexInnerController').set('state', state);
      } else {
        this.get('urlsIndexInnerController').set('state', null);
      }
    }
  }
});
