Aggregator.PublishTimeable = Ember.Mixin.create({
  publishTime: DS.attr('number'),

  publishTimeFrom: function(){
    return moment(this.get('publishTime')).fromNow();
  }.property('publishTime'),

  publishTimeFull: function(){
    return this.get('publishTimeFullLL');
  }.property('publishTimeFullLL'),

  publishTimeISO: function(){
    return moment(this.get('publishTime')).format();
  }.property('publishTimeFullL'),

  publishTimeFullLL: function(){
    return moment(this.get('publishTime')).format('LL');
  }.property('publishTime'),

  publishTimeFullLLL: function(){
    return moment(this.get('publishTime')).format('LLL');
  }.property('publishTime'),

  publishTimeFullLLLL: function(){
    return moment(this.get('publishTime')).format('LLLL');
  }.property('publishTime')
});
