Aggregator.ApplicationController = Ember.Controller.extend({
  actions: {
    logout: function(){
      Aggregator.__container__.lookup('simple-auth-session:main').invalidate();
    }
  }
});
