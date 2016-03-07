Ember.Application.initializer({
  name: 'current-user',
  after: 'simple-auth',

  initialize: function(application) {
    application.deferReadiness();

    var session = application.__container__.lookup('simple-auth-session:main');

    session.on('sessionAuthenticationSucceeded', function(){
      var store = Aggregator.__container__.lookup('service:store');
      store.find('user', 'me').then(function(user){
        session.set('currentUser', user);
      });
    });

    application.advanceReadiness();
  }
});
