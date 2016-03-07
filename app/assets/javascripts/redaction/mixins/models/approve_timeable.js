Aggregator.ApproveTimeable = Ember.Mixin.create({
  approveTime: DS.attr('number'),

  approveTimeFrom: function(){
    return moment(this.get('approveTime')).fromNow();
  }.property('approveTime'),

  approveTimeFull: function(){
    return this.get('approveTimeFullLL');
  }.property('approveTimeFullLL'),

  approveTimeISO: function(){
    return moment(this.get('approveTime')).format();
  }.property('approveTimeFullL'),

  approveTimeFullLL: function(){
    return moment(this.get('approveTime')).format('LL');
  }.property('approveTime'),

  approveTimeFullLLL: function(){
    return moment(this.get('approveTime')).format('LLL');
  }.property('approveTime'),

  approveTimeFullLLLL: function(){
    return moment(this.get('approveTime')).format('LLLL');
  }.property('approveTime')
});
