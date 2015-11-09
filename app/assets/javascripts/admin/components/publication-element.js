Aggregator.PublicationElementComponent = Ember.Component.extend({
  classNames: ['publication-element'],
  classNameBindings: ['byBoxType'],
  attributeBindings: ['data-id'],
  'data-id': Ember.computed.reads('publication.id'),

  byBoxType: Ember.computed('boxType', function(){
    switch (this.get('boxType')) {
      case 'one':
        return "col-lg-12 col-md-12"
        break;
      case 'two':
        return "col-lg-6 col-md-6"
        break;
      case 'three':
        return "col-lg-4 col-md-4"
        break;
      case 'four':
        return "col-lg-3 col-md-3"
        break;
      case 'five':
        return "col-lg-15 col-md-15"
        break;
      default:
        return "col-lg-12 col-md-12";
        break;
    }
  }),

  actions: {
    removeFromBox: function(){
      var publication = this.get('publication'), box = publication.get('box');
      box.get('publications').removeObject(publication);
      publication.set('box', null);
      this.toggleProperty('fakeFire');
      //var boxIds = publication.get('boxIds');
      //boxIds.removeObject(parseInt(this.get('box.id')));

      //var categoryIds = publication.get('categoryIds');
      //categoryIds.removeObject(parseInt(this.get('category.id')));

      //publication.set('boxIds', boxIds);
      //publication.set('categoryIds', categoryIds);
      //publication.save().then(function(publication){
      //  _this.get('box').reload();
      //});
    }
  }
});
