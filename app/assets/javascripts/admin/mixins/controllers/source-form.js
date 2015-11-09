Aggregator.SourceFormMixin = Ember.Mixin.create({
  sourcesController: Ember.inject.controller("sources"),

  actions: {
    addSource: function(type){
      var source = this.store.createRecord('embedSource', {
        type: type
      });

      this.get('model.embedSources').unshiftObject(source);
    },

    removeSource: function(){
      this.get('model').destroyRecord();
    },

    saveSource: function(){
      var _this = this;
      this.get('model').save().then(function(source){
        window.location.reload();
      });
    }
  }
});
