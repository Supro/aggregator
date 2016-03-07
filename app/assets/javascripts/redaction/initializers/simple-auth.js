Aggregator.CustomAuthenticator = SimpleAuth.Authenticators.OAuth2.extend({
  tokenEndpoint: '/oauth/token',
  makeRequest: function(url, data){
    requestData = Ember.$.extend(data, {
      username: data.username,
      password: data.password,
      client_id: "f3032ec9fbe3bc045bdec5a7d10ac34f3dd78562172ce289306e05bc39e0500d",
      client_secret: "0a6069326062ce2282d85211fb895cc3d991409fb543919e90709ab378080d37"
    });

    return Ember.$.ajax({
      url: this.tokenEndpoint,
      type: 'POST',
      data: requestData,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded'
    });
  }
});

Ember.Application.initializer({
  name: 'authentication',
  before: 'simple-auth',

  initialize: function(application) {
    application.deferReadiness();

    SimpleAuth.Session.reopen({
      currentUser: Ember.computed('access_token', function(){})
    });

    window.ENV = window.ENV || {};
    window.ENV['simple-auth'] = window.ENV['simple-auth'] || {};
    window.ENV['simple-auth'] = Ember.$.extend(window.ENV['simple-auth'], {
      routeAfterAuthentication: 'publications',
      routeIfAlreadyAuthenticated: 'publications',
      store: 'simple-auth-session-store:cookie',
      authorizer: 'simple-auth-authorizer:oauth2-bearer'
    });
    application.register('authenticator:custom', Aggregator.CustomAuthenticator);
    application.advanceReadiness();
  }
});
