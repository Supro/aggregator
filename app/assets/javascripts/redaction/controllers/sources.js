Aggregator.SourcesController = Ember.Controller.extend({
  filteredSources: Ember.computed('model.[]', 'titleFilter', function(){
    var _this = this;

    var sources = this.get('model');

    if (Ember.isPresent(this.get('titleFilter'))) {
      var regex = new RegExp(this.get('titleFilter'));

      var sources = sources.filter(function(source, index, array){
        return regex.test(source.get('title')) || regex.test(source.get('url'));
      });
    }

    return sources;
  }),
});
