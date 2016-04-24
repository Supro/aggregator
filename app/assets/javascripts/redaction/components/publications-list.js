Aggregator.PublicationsListComponent = Ember.Component.extend({
  classNames: ['publications-list', 'col-lg-3', 'col-md-3'],

  loading: false,

  publications: Ember.computed('category', function(){
    var _this = this;

    return this.get('store').query('publication', {state: 'published'});//.then(function(publications){
    //  _this.set('publications', publications);
    //});
  }),

  filteredPublications: Ember.computed('categoryPublications.[]', 'publications.[]', 'titleFilter', function(){
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

    //return this.get('store').query('publication', {state: 'published', term: this.get('titleFilter')});

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

  canLoadMore: Ember.computed('publications.[]', function(){
    if (Ember.isPresent(this.get('publications.content.meta'))) {
      return this.get('publications.content.meta').page < this.get('publications.content.meta').total_pages;
    } else {
      return false;
    }
  }),

  actions: {
    getMore: function(){
      this.set('loading', true);

      var _this = this;
      var params = {
        page: (this.get('publications.content.meta').page + 1),
        state: 'published',
      };

      if(Ember.isPresent(this.get('titleFilter'))) {
        params["term"] = this.get('titleFilter');
      }

      this.get('store').query('publication', params).then(function(publications) {
        _this.get('publications.content').set('meta', publications.get('meta'));
        _this.get('publications.content').addObjects(publications.get('content'));
        _this.set('loading', false);
      });
    }
  }
});
