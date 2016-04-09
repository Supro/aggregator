Aggregator.PublicationEditInputComponent = Ember.Component.extend({
  valueTimeout: null,
  timeoutTime: 500,

  canEdit: Ember.computed('session.currentUser.id', 'locked', 'lockedBy.id', function(){
    if (this.get('locked')) {
      if (this.get('session.currentUser.id') === this.get('lockedBy.id')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }),

  gotLockedBy: Ember.computed.notEmpty('lockedBy'),

  cannotEdit: Ember.computed.equal('canEdit', false),

  valueObserver: Ember.observer('value', function(){
    var _this = this;

    if(this.get('canEdit')) {
      clearTimeout(this.get('valueTimeout'));

      this.set('valueTimeout', setTimeout(function(){
        var action_fields = [];
        action_fields.push({key: _this.get('field'), value: _this.get('value')});
        var hash = {name: 'update', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);
      }, _this.get('timeoutTime')));
    }
  }),

  didInsertElement: function(){
    var _this = this, socket = this.get('socket');

    this.$().find('.main-input').focus(function(){
      var action_fields = [];
      action_fields.push({key: _this.get('field') + "_locked", value: "true"});
      action_fields.push({key: _this.get('field') + "_by", value: _this.get('session.currentUser.id')});
      var hash = {name: 'lock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      socket.send(json);
    });

    this.$().find('.main-input').focusout(function(){
      var action_fields = [];
      action_fields.push({key: _this.get('field') + "_locked", value: "false"});
      action_fields.push({key: _this.get('field') + "_by", value: "null"});
      var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      socket.send(json);
    });
  }
});
