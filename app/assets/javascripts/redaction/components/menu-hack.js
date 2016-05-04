Aggregator.MenuHackComponent = Ember.Component.extend({
  didInsertElement: function(){
    Ember.$('.navbar-toggle').click(function(){
      $('.navbar-collapse').toggleClass('collapse');
    });
  }
});
