Aggregator.VideoEditorItemComponent = Aggregator.EditorItemComponent.extend({
  disabled: false,

  getIdFromSource: function(){

    var m = this.get('source').match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    var video_id = m[7];

    return video_id;
  },

  source: Ember.computed('body', function(){
    return this.get('content').source;
  }),

  youtubeValid: Ember.computed('source', function(){
    return /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/.test(this.get('source'));
  }),

  youtubeEmbed: Ember.computed('source', function(){
    return '<iframe class="youtube-video" src="//www.youtube.com/embed/' + this.getIdFromSource() + '?rel=0" frameborder="0" allowfullscreen></iframe>';
  }),

  valueObserver: Ember.observer('source', function(){
    var _this = this;

    //if(this.get('canEdit')) {
      clearTimeout(this.get('valueTimeout'));

      this.set('valueTimeout', setTimeout(function(){
        var content = {
          source: _this.get('source')
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
