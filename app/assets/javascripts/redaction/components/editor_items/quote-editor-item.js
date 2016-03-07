Aggregator.QuoteEditorItemComponent = Aggregator.EditorItemComponent.extend({
  source: Ember.computed('body', function(){
    return this.get('content').source;
  }),

  link: Ember.computed('body', function(){
    return this.get('content').link;
  }),

  text: Ember.computed('body', function(){
    return this.get('content').text;
  }),

  valueObserver: Ember.observer('source', 'link', 'text', function(){
    var _this = this;

    //if(this.get('canEdit')) {
      clearTimeout(this.get('valueTimeout'));

      this.set('valueTimeout', setTimeout(function(){
        var content = {
          source: _this.get('source'),
          link: _this.get('link'),
          text: _this.get('text')
        };
        _this.updateContent(content);
      }, _this.get('timeoutTime')));
    //}
  }),

  didInsertElement: function(){
    var _this = this, socket = this.get('socket');

    this.$().find('.main-input').focus(function(){
      var action_fields = [];
      action_fields.push({key: "body_locked", value: "true"});
      action_fields.push({key: "body_by", value: _this.get('session.currentUser.id')});
      var hash = {name: 'lock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      socket.send(json);
    });

    this.$().find('.main-input').focusout(function(){
      var action_fields = [];
      action_fields.push({key: "body_locked", value: "false"});
      action_fields.push({key: "body_by", value: "null"});
      var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      socket.send(json);
    });
  }
});
