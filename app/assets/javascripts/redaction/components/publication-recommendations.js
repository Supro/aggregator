Aggregator.PublicationRecommendationsComponent = Ember.Component.extend({
  saving: false,

  publications: Ember.computed('publication.recommendationIds.[]', function(){
    params = {
      ids: this.get('publication.recommendationIds')
    }

    if (Ember.isPresent(this.get('publication.recommendationIds'))) {
      return this.store.query('publication', params);
    } else {
      return {content: []};
    }
  }),

  actions: {
    saveRecommendations: function(){
      var recommendations = this.get('publication.recommendationIds');
      var _this = this;
      this.set('saving', true);

      Ember.$.ajax({
        url: '/api/v1/recommendations',
        data: {
          itemable_type: 'Publication',
          itemable_id: _this.get('publication.id'),
          ids: recommendations
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(data){
          _this.set('saving', false);
        }
      });
    }
  }
});
