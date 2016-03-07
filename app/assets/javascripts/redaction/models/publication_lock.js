Aggregator.PublicationLock = DS.Model.extend({
  publication: DS.belongsTo('publication'),

  titleLockedBy: DS.belongsTo('user'),
  titleLocked: DS.attr('boolean'),

  subTitleLockedBy: DS.belongsTo('user'),
  subTitleLocked: DS.attr('boolean'),

  typeLockedBy: DS.belongsTo('user'),
  typeLocked: DS.attr('boolean'),

  contextLockedBy: DS.belongsTo('user'),
  contextLocked: DS.attr('boolean'),

  bodyLockedBy: DS.belongsTo('user'),
  bodyLocked: DS.attr('boolean'),

  urlLockedBy: DS.belongsTo('user'),
  urlLocked: DS.attr('boolean'),

  posterLockedBy: DS.belongsTo('user'),
  posterLocked: DS.attr('boolean'),

  backgroundLockedBy: DS.belongsTo('user'),
  backgroundLocked: DS.attr('boolean'),
});
