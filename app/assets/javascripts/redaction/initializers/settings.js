Ember.Application.initializer({
  name: 'settings',

  initialize: function(application){
    controller = application.__container__.lookup('controller:setting');

    application.register('aggregator:settings', controller, { instantiate: false, singleton: true });

    Ember.$.each(['controller', 'route'], function(index, component){
      application.inject(component, 'settings', 'aggregator:settings');
    });
  }
});
