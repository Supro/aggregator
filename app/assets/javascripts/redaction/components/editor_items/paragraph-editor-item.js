Aggregator.ParagraphEditorItemComponent = Aggregator.EditorItemComponent.extend({
  didInsertElement: function(){
    this._super();
    var _this = this, socket = this.get('socket');

    this.$().find('.item-content').on('focus', function() {
      var action_fields = [];
      action_fields.push({key: "body_locked", value: "true"});
      action_fields.push({key: "body_by", value: _this.get('session.currentUser.id')});
      var hash = {name: 'lock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      socket.send(json);
    }).on('focusout', function() {
      var action_fields = [];
      action_fields.push({key: "body_locked", value: "false"});
      action_fields.push({key: "body_by", value: "null"});
      var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

      var json = JSON.stringify(hash);

      socket.send(json);
    }).on('keyup input', function() {
      clearTimeout(_this.get('valueTimeout'));
      var element = Ember.$(this);

      _this.set('valueTimeout', setTimeout(function(){
        if(_this.get('session.currentUser.isChiefEditor')) {
          var content = element.html();
        } else {
          var content = element.text();
        }
        _this.updateContent(content.replace(/(\r\n|\n|\r)/gm, ''));
      }, _this.get('timeoutTime')));
    }).on('paste', function() {
      setTimeout(function(){
        var element = Ember.$(_this.$().find('.item-content'));
        var re = new RegExp(String.fromCharCode(160), "g");
        var content = element.text().replace(/(\r\n|\n|\r)/gm, '').replace(re, " ");
        if(_this.get('session.currentUser.isChiefEditor')) {
          element.html(content);
        } else {
          element.text(content);
        }
        _this.updateContent(content);
      }, _this.get('timeoutTime'))
    });
  }
});
