Aggregator.Category = DS.Model.extend(Aggregator.Timeable, {
  lines: DS.hasMany('line'),

  title: DS.attr('string'),
  position: DS.attr('number'),
  fakeFire: DS.attr('boolean'),

  linesActive: Ember.computed('lines.@each.willDestroy', 'lines.@each.position', 'fakeFire', function(){
    var lines = this.get('lines');
    lines = lines.filterBy('willDestroy', false);
    lines = lines.sortBy('position');
    return lines;
  })
});
