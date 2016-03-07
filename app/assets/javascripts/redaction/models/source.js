Aggregator.Source = DS.Model.extend(Aggregator.Timeable, {
  embedSources: DS.hasMany('embed-source'),

  title: DS.attr('string'),
  type: DS.attr('string'),
  url: DS.attr('string'),

  childrens: Ember.computed.filterBy('embedSources', 'type', 'child'),
  siblings: Ember.computed.filterBy('embedSources', 'type', 'sibling'),

  titleValid: Ember.computed('title', function(){
    return this.get('title.length') > 2;
  }),

  urlValid: Ember.computed('url', function(){
    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(this.get('url'));
  }),

  formValid: Ember.computed('titleValid', 'urlValid', function(){
    return this.get('urlValid') && this.get('titleValid');
  }),

  formInvalid: Ember.computed.equal('formValid', false)
});

Aggregator.EmbedSource = Aggregator.Source.extend({
  embedSources: null,
  source: DS.belongsTo('source'),

  willDestroy: DS.attr('boolean', {defaultValue: false})
});
