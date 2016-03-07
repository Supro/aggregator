Aggregator.SortableLinesComponent = Ember.Component.extend({
  classNames: ['lines', 'col-lg-9', 'col-md-9'],

  didInsertElement: function(){
    var _this = this;

    this.$().sortable({
      update: function(event, ui){
        _this.$().sortable('disable');

        current = _this.get('category.lines').findBy('position', parseInt(ui.item.attr('data-position')));
        //_this.store.find('line', ui.item.data('id')).then(function(current){

          var prev = ui.item.prev();

          if (Ember.isPresent(prev)) {
            prev = _this.get('category.lines').findBy('position', parseInt(prev.attr('data-position')));
            //_this.store.find('line', prev.data('id')).then(function(prev){
              var init = prev.get('position');
              var position = init;
              _this.get('category.lines').filter(function(line, index, enumerable){
                return line.get('position') <= init;
              }).sortBy('position').reverse().forEach(function(line){
                position -= 1;
                line.set('position', position);
              });
              current.set('position', init);
              _this.get('category').toggleProperty('fakeFire');
            //});
          } else {
            var next = ui.item.next();
            //console.log(next.text());
            next = _this.get('category.lines').findBy('position', parseInt(next.attr('data-position')));
            //_this.store.find('line', next.data('id')).then(function(next){
              var init = next.get('position');
              console.log(next.get('type') + " - " + next.get('position'));
              var position = init;
              _this.get('category.lines').filter(function(line, index, enumerable){
                return line.get('position') >= init;
              }).sortBy('position').forEach(function(line){
                position += 1;
                line.set('position', position);
              });
              current.set('position', init);
              _this.get('category').toggleProperty('fakeFire');
            //});
          }

          _this.$().sortable('enable');
        //});
      }
    });
  },

  actions: {
    destroyLine: function(line){
      var _this = this;
      if (Ember.isPresent(line.get('id'))) {
        _this.get('category.lines').removeObject(line);
        line.set('willDestroy', true);
        _this.get('category.lines').pushObject(line);
      } else {
        _this.get('category.lines').removeObject(line);
      }
    }
  }
});
