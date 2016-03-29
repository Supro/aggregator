Aggregator.PublicationApproveComponent = Ember.Component.extend({
  classNames: ['publication-approve'],

  actions: {
    moveToApproved: function(){
      publication = this.get('publication')

      if (publication.get('canApprove')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/move_to_approved',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.set('state', 'approved');
          }
        });
      }
    },

    moveToPending: function(){
      publication = this.get('publication')

      if (publication.get('canApprove')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/move_to_pending',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.set('state', 'pending');
          }
        });
      }
    },

    moveToPublished: function(){
      publication = this.get('publication')

      if (publication.get('canPublish')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/move_to_published',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.set('state', 'published');
          }
        });
      }
    }
  }
});
