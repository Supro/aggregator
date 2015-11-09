Aggregator.PublicationsListComponent = Ember.Component.extend({
  classNames: ['publications-list', 'col-lg-3', 'col-md-3'],

  filteredPublications: Ember.computed('categoryPublications.[]', 'titleFilter', function(){
    var _this = this;

    var publications = this.get('publications').filter(function(publication, index, array){
      return !_this.get('categoryPublications').contains(publication);
    });

    if (Ember.isPresent(this.get('titleFilter'))) {
      var regex = new RegExp(this.get('titleFilter'));

      var publications = this.get('publications').filter(function(publication, index, array){
        return regex.test(publication.get('title'));
      });
    }

    return publications;
  }),

  categoryPublications: Ember.computed('category.lines.[]', 'fakeFire', function(){
    var array = [];

    this.get('category.linesActive').forEach(function(line){
      line.get('boxes').forEach(function(box){
        box.get('publications').forEach(function(publication){
          array.push(publication);
        });
      });
    });

    return array;
  }),

  didInsertElement: function(){
    var _this = this;

    this.$().sortable({
      connectWith: '.box-list',
      update: function(event, ui){
        //_this.$().sortable('disable');

        data = {
          id: ui.item.data('id')
        };

        var prev = ui.item.prev();

        if(Ember.isPresent(prev)) {
          data['prev'] = prev.data('id');
        } else {
          var next = ui.item.next();
          data['next'] = next.data('id');
        }
      }
    });
  },

  actions: {}
});
