Aggregator.UsersIndexController = Ember.Controller.extend({
  usersIndexInnerController: Ember.inject.controller('urls.index.inner'),

  state: Ember.computed.alias('usersIndexInnerController.state'),

  termObserver: Ember.observer('term', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.get('usersIndexInnerController').set('term', _this.get('term'));
    }, 500));
  })
});
