Aggregator.PublicationPromoteComponent = Ember.Component.extend({
  classNames: ['publication-promote'],

  actions: {
    promote: function(){
      publication = this.get('publication')

      if (publication.get('canPromote')) {
        Ember.$.ajax({
          url: '/api/v1/publications/' + publication.get('id') + '/promote',
          type: 'PUT',
          dataType: 'JSON',
          success: function(data){
            publication.reload();
          }
        });
      }
    }
  }
});
