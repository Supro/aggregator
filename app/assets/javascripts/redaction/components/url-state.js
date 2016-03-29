Aggregator.UrlStateComponent = Ember.Component.extend({
  classNames: ['publication-approve'],

  actions: {
    moveToLame: function(){
      url = this.get('url')

      if (url.get('isNew')||url.get('isIntresting')) {
        Ember.$.ajax({
          url: '/api/v1/urls/' + url.get('id') + '/move_to_lame',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            url.set('state', 'lame');
          }
        });
      }
    },

    moveToIntresting: function(){
      url = this.get('url')

      if (url.get('isNew')||url.get('isLame')) {
        Ember.$.ajax({
          url: '/api/v1/urls/' + url.get('id') + '/move_to_intresting',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            url.set('state', 'intresting');
          }
        });
      }
    }
  }
});
