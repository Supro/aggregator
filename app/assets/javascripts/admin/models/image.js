Aggregator.Image = DS.Model.extend({
  url: DS.attr('string'),
  thumb: DS.attr('string'),

  imageableType: DS.attr('string'),
  imageableId: DS.attr('number')
});
