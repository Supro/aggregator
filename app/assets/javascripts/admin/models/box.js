Aggregator.Box = DS.Model.extend({
  line: DS.belongsTo('line'),
  image: DS.belongsTo('image'),

  publications: DS.hasMany('publication'),

  type: DS.attr('string'),
  title: DS.attr('string'),
  position: DS.attr('number'),
  willDestroy: DS.attr('boolean', {defaultValue: false})
});
