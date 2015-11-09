Aggregator.Line = DS.Model.extend({
  category: DS.belongsTo('category'),
  boxes: DS.hasMany('box'),

  type: DS.attr('string'),

  position: DS.attr('number'),
  willDestroy: DS.attr('boolean', {defaultValue: false})
});
