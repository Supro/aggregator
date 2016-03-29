Aggregator.PublicationsIndexController = Ember.Controller.extend({
  publicationsIndexInnerController: Ember.inject.controller('publications.index.inner'),

  state: Ember.computed.alias('urlsIndexInnerController.state'),
  type: Ember.computed.alias('urlsIndexInnerController.type'),

  termObserver: Ember.observer('term', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.get('publicationsIndexInnerController').set('term', _this.get('term'));
    }, 500));
  }),

  actions: {
    selectType: function(type) {
      if (['news', 'guide', 'video'].contains(type)) {
        this.get('publicationsIndexInnerController').set('type', type);
      } else {
        this.get('publicationsIndexInnerController').set('type', null);
      }
    },

    selectState: function(state) {
      if (['pending', 'approved'].contains(state)) {
        this.get('publicationsIndexInnerController').set('state', state);
      } else {
        this.get('publicationsIndexInnerController').set('state', null);
      }
    }
  }
});
