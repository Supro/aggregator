Aggregator.PublicationEditSelectComponent = Aggregator.PublicationEditInputComponent.extend({
  timeoutTime: 0,

  actions: {
    selectType: function(type){
      this.set('value', type);
    },
  }
});
