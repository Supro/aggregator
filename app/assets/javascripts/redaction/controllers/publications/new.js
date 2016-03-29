Aggregator.PublicationsNewController = Ember.Controller.extend(Aggregator.PublicationSourceFormMixin, {
  queryParams: ['url', 'type'],

  setSource: function(source){
    this.get('model').set('source', source);
  },

  actions: {
    removeSource: function(){
      this.get('model').set('source', null);
      this.set('model.url', null);
    },

    savePublication: function(){
      var _this = this;

      this.get('model').save().then(function(publication){
        _this.transitionToRoute('publications.show', publication.id);
      });
    },

    selectType: function(type){
      this.get('model').set('type', type);
    }
  }
});
