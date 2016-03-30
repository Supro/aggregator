Aggregator.UsersShowController = Ember.Controller.extend({
  actions: {
    saveUser: function(){
      var _this = this;

      this.get('model').save().then(function(user){
        _this.transitionToRoute('users.show', user.id);
      });
    }
  }
});
