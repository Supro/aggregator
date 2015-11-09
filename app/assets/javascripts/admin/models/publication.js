Aggregator.Publication = DS.Model.extend(Aggregator.Timeable, {
  box: DS.belongsTo('box'),

  categoryIds: DS.attr('array'),
  boxIds: DS.attr('array'),
  title: DS.attr('string'),
  position: DS.attr('number')
});
