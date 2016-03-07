Aggregator.ApplicationRoute = Ember.Route.extend(SimpleAuth.ApplicationRouteMixin, {
  model: function(){
    var session = this.get('session');

    if (session.get('isAuthenticated')) {
      return this.store.findRecord('user', 'me').then(function(user){
        session.set('currentUser', user);
      });
    } else {
      return {};
    }
  }
});
