Aggregator.PagesShowController = Ember.Controller.extend({
  fakeFire: false,

  actions: {
    saveCategory: function(){
      var _this = this;
      this.get('model').save();
      window.location.reload();
    },

    pushLine: function(type){
      var _this = this;
      var lastLine = this.get('model.linesActive.lastObject');
      if (Ember.isPresent(lastLine)) {
        position = lastLine.get('position') + 1
      } else {
        position = 0;
      }

      var line = this.store.createRecord('line', {
        type: type,
        category: this.get('model'),
        position: position
      });

      if (type === 'one') {
        var box = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        line.get('boxes').pushObject(box);
      }

      if (type === 'two') {
        var box = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        var box2 = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        line.get('boxes').pushObject(box);
        line.get('boxes').pushObject(box2);
      }

      if (type === 'three') {
        var box = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        var box2 = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        var box3 = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        line.get('boxes').pushObject(box);
        line.get('boxes').pushObject(box2);
        line.get('boxes').pushObject(box3);
      }

      if (type === 'four') {
        var box = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        var box2 = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        var box3 = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        var box4 = this.store.createRecord('box', {
          type: 'one',
          line: line
        });

        line.get('boxes').pushObject(box);
        line.get('boxes').pushObject(box2);
        line.get('boxes').pushObject(box3);
        line.get('boxes').pushObject(box4);
      }

      window.t = line;

      this.get('model.lines').pushObject(line);

      //line.save().then(function(line){
      //  _this.get('model.lines').pushObject(line);
      //});
    }
  }
});
