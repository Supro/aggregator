Aggregator.PublicationsListComponent = Ember.Component.extend({
  classNames: ['publications-list', 'col-lg-3', 'col-md-3'],

  loading: false,
  title: '',
  valuesTimeout: null,

  publications: Ember.computed('title', function(){
    var _this = this;

    params = {
      state: 'published',
      term: this.get('title')
    }

    return this.get('store').query('publication', params);
  }),

  titleFilterObserver: Ember.observer('titleFilter', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.set('title', _this.get('titleFilter'));
    }, 500));
  }),

  filteredPublications: Ember.computed('categoryPublications.[]', 'publications.[]', function(){
    var _this = this;

    var publications = this.get('publications').filter(function(publication, index, array){
      return !_this.get('categoryPublications').contains(publication);
    });

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
        term: this.get('title')
      };

      this.get('store').query('publication', params).then(function(publications) {
        _this.get('publications.content').set('meta', publications.get('meta'));
        _this.get('publications.content').addObjects(publications.get('content'));
        _this.set('loading', false);
      });
    }
  }
});

Aggregator.PublicationsRecommendationsListComponent = Aggregator.PublicationsListComponent.extend({

  filteredPublications: Ember.computed('ids.[]', 'publications.[]', function(){
    var _this = this;

    var publications = this.get('publications').filter(function(publication, index, array){
      return !_this.get('ids').contains(parseInt(publication.get('id')));
    });

    return publications;
  })
});
