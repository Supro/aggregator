Aggregator.CustomAuthenticator = SimpleAuth.Authenticators.OAuth2.extend({
  tokenEndpoint: '/oauth/token',
  makeRequest: function(url, data){
    requestData = Ember.$.extend(data, {
      username: data.username,
      password: data.password,
      client_id: "14e00928ed2365344c5f3e840bff17ab255d89c55bbc9e6df093f80756fa56ff",
      client_secret: "97f4a70459e88fc1d5bc101ca16316a4b417e401f82ed62b6a3fe3aae4c655b7"
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
