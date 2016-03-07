Aggregator.LoginController = Ember.Controller.extend(SimpleAuth.LoginControllerMixin, {
  authenticator: 'authenticator:custom',
  identification: '',
  password: '',
  resetSend: false,

  usernameValid: function(){
    if((this.get('identification') != null) && (this.get('identification').length > 0)){
      return true;
    }else{
      return false;
    }
  }.property('identification'),

  passwordValid: function(){
    if((this.get('password') != null) && (this.get('password').length > 0)){
      return true;
    }else{
      return false;
    }
  }.property('password'),

  formValid: function(){
    if(this.get('passwordValid') && this.get('usernameValid')){
      return true;
    }else{
      return false;
    }
  }.property('usernameValid', 'passwordValid'),

  formInvalid: function(){
    return !this.get('formValid');
  }.property('formValid'),

  actions: {
    loginFailed: function(responseBody){
      var message = responseBody.error;
      this.controller.set('errorMessage', message);
    },

    authenticate: function() {
      var _this = this;
      this._super().then(null, function(error) {
        var message = error.error_description;
        _this.set('errorMessage', message);
      });
    }
  }
});
