Aggregator.EditorItemComponent = Ember.Component.extend({
  classNames: ['editor-item'],
  attributeBindings: ['position'],
  valueTimeout: null,
  timeoutTime: 500,

  type: Ember.computed("currentItem", function(){
    return this.get('currentItem').type
  }),

  position: Ember.computed("currentItem", function(){
    return this.get('currentItem').position
  }),

  content: Ember.computed("currentItem", function(){
    return this.get('currentItem').content
  }),

  currentItemIndex: Ember.computed("currentItem", function(){
    return this.get('json').indexOf(this.get('currentItem'));
  }),

  enabled: Ember.computed('disabled', function(){
    return !this.get("disabled");
  }),

  updateItem: function(){
    var json = this.get('json');

    json[this.get('currentItemIndex')] = {
      type: this.get('type'),
      position: this.get('position'),
      content: this.get('content')
    };

    var result = JSON.stringify(json);

    //this.set('body', result);

    var action_fields = [];
    action_fields.push({key: "body", value: result});
    var hash = {name: 'update', user_id: this.get('session.currentUser.id'), action_fields: action_fields};

    var json = JSON.stringify(hash);

    this.get('socket').send(json);
  },

  updateContent: function(value){
    this.set('content', value);
    this.updateItem();
  },

  updatePosition: function(value){
    this.set('position', value);
    this.updateItem();
  },

  actions: {
    removeItem: function(){
      if (!this.get('disabled')) {
        var json = this.get('json');

        json.removeObject(this.get('currentItem'));

        var result = JSON.stringify(json);

        this.set('model.body', result);

        var action_fields = [];
        action_fields.push({key: "body", value: result});
        var hash = {name: 'update', user_id: this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        this.get('socket').send(json);
      }
    }
  },

  didInserElement: function(){}
});
