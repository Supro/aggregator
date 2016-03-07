window.ENV = window.ENV || {};
window.ENV['simple-auth'] = {
  routeAfterAuthentication: 'publications',
  routeIfAlreadyAuthenticated: 'publications',
  store: 'simple-auth-session-store:cookie',
  authorizer: 'simple-auth-authorizer:oauth2-bearer',
}
