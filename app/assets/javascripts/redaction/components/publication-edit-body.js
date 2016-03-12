Aggregator.PublicationEditBodyComponent = Ember.Component.extend({
  classNames: ['publication-edit-body'],

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

  cannotEdit: Ember.computed.equal('canEdit', false),

  bodyJSON: Ember.computed('model.body', function(){
    var json = JSON.parse(this.get('model.body'));

    json.forEach(function(item){
      item["isParagraph"] = item.type === "paragraph"
      item["isHeading"] = item.type === "heading"
      item["isImage"] = item.type === "image"
      item["isVideo"] = item.type === "video"
      item["isAdv"] = item.type === "adv"
      item["isTweet"] = item.type === "tweet"
      item["isQuote"] = item.type === "quote"
    });

    return json.sortBy('position');
  }),

  addItemToBody: function(type, content){
    var json = this.get('bodyJSON');
    var position = 0;

    if (json.length > 0) {
      position = json[json.length - 1].position + 1;
    }

    json.push({
      type: type,
      position: position,
      content: content
    });

    var result = JSON.stringify(json);

    this.set('model.body', result);

    var action_fields = [];
    action_fields.push({key: "body", value: result});
    var hash = {name: 'update', user_id: this.get('session.currentUser.id'), action_fields: action_fields};

    var json = JSON.stringify(hash);

    this.get('socket').send(json);
  },

  didInsertElement: function() {
    var _this = this, socket = this.get('socket');

    this.$().find('.body-edit-content').sortable({
      items: ".editor-item",
      handle: ".handle",
      cancel: '.item-content, input',
      start: function(event, ui){
        var action_fields = [];
        action_fields.push({key: "body_locked", value: "true"});
        action_fields.push({key: "body_by", value: _this.get('session.currentUser.id')});
        var hash = {name: 'lock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        socket.send(json);
      },
      stop: function(event, ui){
        var action_fields = [];
        action_fields.push({key: "body_locked", value: "false"});
        action_fields.push({key: "body_by", value: "null"});
        var hash = {name: 'unlock', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

        var json = JSON.stringify(hash);

        socket.send(json);
      },
      update: function(event, ui){
        _this.$().find('.body-edit-content').sortable('disable');

        current = _this.get('bodyJSON').findBy('position', parseInt(ui.item.attr('position')));
        //_this.store.find('line', ui.item.data('id')).then(function(current){

          var prev = ui.item.prev(".editor-item");

          if (Ember.isPresent(prev)) {
            prev = _this.get('bodyJSON').findBy('position', parseInt(prev.attr('position')));
            //_this.store.find('line', prev.data('id')).then(function(prev){
              var init = prev.position;
              var position = init;
              _this.get('bodyJSON').filter(function(line, index, enumerable){
                return line.position <= init;
              }).sortBy('position').reverse().forEach(function(line){
                position -= 1;
                line.position = position;
              });
              current.position = init;
            //});
          } else {
            var next = ui.item.next(".editor-item");
            //console.log(next.text());
            next = _this.get('bodyJSON').findBy('position', parseInt(next.attr('position')));
            //_this.store.find('line', next.data('id')).then(function(next){
              var init = next.position;
              var position = init;
              _this.get('bodyJSON').filter(function(line, index, enumerable){
                return line.position >= init;
              }).sortBy('position').forEach(function(line){
                position += 1;
                line.position = position;
              });
              current.position = init;
            //});
          }

          var result = JSON.stringify(_this.get('bodyJSON'));

          var action_fields = [];
          action_fields.push({key: "body", value: result});
          var hash = {name: 'update', user_id: _this.get('session.currentUser.id'), action_fields: action_fields};

          var json = JSON.stringify(hash);

          socket.send(json);
          _this.set('model.body', result);

          _this.$().find('.body-edit-content').sortable('enable');
        //});
      }
    });
  },

  actions: {
    addParagraph: function(){
      this.addItemToBody("paragraph", "Абзац Арнольда. Мне нужна твоя одежда, ботинки и мотоцикл. Не будите моего друга, он смертельно устал!. Скажи папочке пока. Хулиганы...");
    },

    addHeading: function(){
      this.addItemToBody("heading", "Заголовок Арнольда. Мне нужна твоя одежда, ботинки и мотоцикл. Хулиганы...");
    },

    addTweet: function(){
      this.addItemToBody("tweet", {
        source: ""
      });
    },

    addQuote: function(){
      this.addItemToBody("quote", {
        link: "",
        source: "",
        text: "Цитата Арнольда. Мне нужна твоя одежда, ботинки и мотоцикл."
      });
    },

    addImage: function(){
      this.addItemToBody("image", {
        source: "",
        alt: "",
        width: "",
        height: "",
        url: ""
      });
    },

    addVideo: function(){
      this.addItemToBody("video", {
        source: ""
      });
    },

    addAdv: function(){
      this.addItemToBody("adv", "");
    }
  }
});
