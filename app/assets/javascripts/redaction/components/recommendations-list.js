Aggregator.RecommendationsListComponent = Ember.Component.extend({
  classNames: ['recommendations-list'],

  //sortableObserver: Ember.observer('publications.[]', 'initFire', function(){
  //  console.log(this.get('publications'));
  //}),

  didInsertElement: function(){
    var _this = this;

    this.$().find('.box-list').sortable({
      //connectWith: '.box-list',
      update: function(event, ui){
        _this.$().find('.box-list').sortable('disable');

        var id = ui.item.data('id');
        //ui.item.remove();

        _this.get('store').find('publication', id).then(function(publication){
          _this.$().find('.box-list').sortable('enable');
          _this.get('ids').pushObject(parseInt(id));
          _this.get('publications').pushObject(publication._internalModel);
          //var boxIds = publication.get('boxIds');
          //boxIds.pushObject(_this.get('box.id'));

          //var categoryIds = publication.get('categoryIds');
          //categoryIds.pushObject(_this.get('category.id'));

          //publication.set('boxIds', boxIds);
          //publication.set('categoryIds', categoryIds);
          //publication.save().then(function(publication){
          //  _this.get('box').reload();
          //  _this.$().children('.box-list').sortable('enable');
          //});
        });
      }
    });

    //this.set('initFire', true);
  },
});
