Aggregator.PublicationEditInputComponent = Ember.Component.extend({
  valueTimeout: null,
  timeoutTime: 500,

  valueObserver: Ember.observer('value', function(){
    var _this = this;

    if(!this.get('locked')) {
      clearTimeout(this.get('valueTimeout'));

      this.set('valueTimeout', setTimeout(function(){
        var hash = {action: 'update', id: _this.get('model_id'), user_id: 1, data: {}};

        hash['data'][_this.get('field')] = _this.get('value');

        var json = JSON.stringify(hash);

        _this.get('socket').send(json);
      }, _this.get('timeoutTime')));
    }
  }),

  didInsertElement: function(){
    var _this = this, socket = this.get('socket');

    this.$().find('input.main-input').focus(function(){
      var hash = {action: 'lock', id: _this.get('model_id'), user_id: 1, data: {field: _this.get('field')}};

      var json = JSON.stringify(hash);

      socket.send(json);
    });

    this.$().find('input.main-input').focusout(function(){
      var hash = {action: 'unlock', id: _this.get('model_id'), user_id: 1, data: {field: _this.get('field')}};

      var json = JSON.stringify(hash);

      socket.send(json);
    });

    //this.$().find('input').change(function(){
    //  var hash = {action: 'update', data: {}};

    //  hash['data'][_this.get('field')] = _this.get('value');

    //  var json = JSON.stringify(hash);

    //  socket.send(json);
    //});
  }
});
