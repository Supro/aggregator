Aggregator.Url = DS.Model.extend(Aggregator.Timeable, {
  source:       DS.belongsTo('source'),
  publication:  DS.belongsTo('publication'),

  title:   DS.attr('string'),
  context: DS.attr('string'),
  path:    DS.attr('string'),
  image:   DS.attr('string'),
  state:   DS.attr('string'),

  isNew: Ember.computed.equal('state', 'new'),
  isLame: Ember.computed.equal('state', 'lame'),
  isIntresting: Ember.computed.equal('state', 'intresting')
});
