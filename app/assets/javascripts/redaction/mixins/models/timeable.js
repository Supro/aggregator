Aggregator.Timeable = Ember.Mixin.create({
  time: DS.attr('number'),

  timeFrom: function(){
    return moment(this.get('time')).fromNow();
  }.property('time'),

  timeFull: function(){
    return this.get('timeFullLL');
  }.property('timeFullLL'),

  timeISO: function(){
    return moment(this.get('time')).format();
  }.property('timeFullL'),

  timeFullLL: function(){
    return moment(this.get('time')).format('LL');
  }.property('time'),

  timeFullLLL: function(){
    return moment(this.get('time')).format('LLL');
  }.property('time'),

  timeFullLLLL: function(){
    return moment(this.get('time')).format('LLLL');
  }.property('time')
});
