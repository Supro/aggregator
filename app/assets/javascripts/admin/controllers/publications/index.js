Aggregator.PublicationsIndexController = Ember.Controller.extend({
  publicationsIndexInnerController: Ember.inject.controller('publications.index.inner'),

  termObserver: Ember.observer('term', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.get('publicationsIndexInnerController').set('term', _this.get('term'));
    }, 500));
  }),

  actions: {
    selectType: function(type) {
      if (['news', 'guide'].contains(type)) {
        this.get('publicationsIndexInnerController').set('type', type);
      } else {
        this.get('publicationsIndexInnerController').set('type', null);
      }
    }
  }
});
