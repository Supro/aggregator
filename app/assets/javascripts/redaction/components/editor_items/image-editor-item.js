Aggregator.ImageEditorItemComponent = Aggregator.EditorItemComponent.extend({
  source: Ember.computed('body', function(){
    return this.get('content').source;
  }),

  url: Ember.computed('body', function(){
    return this.get('content').url;
  }),

  thumb: Ember.computed('body', function(){
    return this.get('content').thumb;
  }),

  alt: Ember.computed('body', function(){
    return this.get('content').alt;
  }),

  width: Ember.computed('body', function(){
    var val = this.get('content').width;

    if (val == 0) {
      return "";
    } else {
      return val;
    }
  }),

  height: Ember.computed('body', function(){
    var val = this.get('content').height;

    if (val == 0) {
      return "";
    } else {
      return val;
    }
  }),

  widthPresent: Ember.computed.notEmpty('width'),
  heightPresent: Ember.computed.notEmpty('height'),

  widthAndHeightPresent: Ember.computed('widthPresent', 'heightPresent', function(){
    return this.get('widthPresent') && this.get('heightPresent');
  }),

  widthOrHeightPresent: Ember.computed('widthPresent', 'heightPresent', function(){
    return this.get('widthPresent') || this.get('heightPresent');
  }),

  valueObserver: Ember.observer('source', 'url', 'thumb', 'alt', 'height', 'width', function(){
    var _this = this;

    console.log('here');

    //if(this.get('canEdit')) {
      clearTimeout(this.get('valueTimeout'));

      this.set('valueTimeout', setTimeout(function(){
        var content = {
          source: _this.get('source'),
          alt: _this.get('alt'),
          height: _this.get('height'),
          width: _this.get('width'),
          url: _this.get('url')
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
