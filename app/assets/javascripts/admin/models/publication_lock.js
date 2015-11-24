Aggregator.PublicationLock = DS.Model.extend({
  publication: DS.belongsTo('publication'),

  titleLocked: DS.attr('boolean')
});
