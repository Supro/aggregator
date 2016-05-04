Aggregator.RecommendationsIndexController = Ember.Controller.extend({
  saving: false,

  actions: {
    saveRecommendations: function(){
      var recommendations = this.get('settings.recommendations');
      var _this = this;
      this.set('saving', true);

      Ember.$.ajax({
        url: '/api/v1/recommendations',
        data: {
          itemable_type: 'Category',
          itemable_id: 1,
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
