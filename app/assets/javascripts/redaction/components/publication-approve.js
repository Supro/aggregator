Aggregator.PublicationApproveComponent = Ember.Component.extend({
  classNames: ['publication-approve'],

  actions: {
    moveToApproved: function(){
      publication = this.get('publication')

      if (publication.get('canMoveToApproved')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/move_to_approved',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.reload();
          }
        });
      }
    },

    moveToDeclined: function(){
      publication = this.get('publication')

      if (publication.get('canMoveToDeclined')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/move_to_declined',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.reload();
          }
        });
      }
    },

    moveToRework: function(){
      publication = this.get('publication')

      if (publication.get('canMoveToRework')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/move_to_rework',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.reload();
          }
        });
      }
    },

    moveToChecking: function(){
      publication = this.get('publication')

      if (publication.get('canMoveToChecking')) {
        if (confirm("Во время проверки, публикацию нельзя будет редактировать.")) {
          Ember.$.ajax({
            url: '/api/v1/publications/' + publication.get('id') + '/move_to_checking',
            type: 'PUT',
            dataType: 'JSON',
            success: function(data){
              publication.reload();
            }
          });
        }
      }
    },

    moveToReady: function(){
      publication = this.get('publication')

      if (publication.get('canMoveToReady')) {
        if (confirm("После этого публикацию уже нельзя будет редактировать.")) {
          Ember.$.ajax({
            url: '/api/v1/publications/' + publication.get('id') + '/move_to_ready',
            type: 'PUT',
            dataType: 'JSON',
            success: function(data){
              publication.reload();
            }
          });
        }
      }
    }
  }
});
