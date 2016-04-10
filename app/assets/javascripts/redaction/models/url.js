Aggregator.Url = DS.Model.extend(Aggregator.Timeable, {
  source:       DS.belongsTo('source'),
  publication:  DS.belongsTo('publication'),

  title:   DS.attr('string'),
  context: DS.attr('string'),
  path:    DS.attr('string'),
  image:   DS.attr('string'),
  state:   DS.attr('string'),
  pubId:   DS.attr('number'),

  isNew: Ember.computed.equal('state', 'new'),
  isLame: Ember.computed.equal('state', 'lame'),
  isIntresting: Ember.computed.equal('state', 'intresting'),
  isLinked: Ember.computed.equal('state', 'linked'),

  pathValid: Ember.computed('path', function(){
    //return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(this.get('path'));
    return true;
  }),

  pathTitle: Ember.computed('path', function(){
    return "Ссылка";
  }),

  formSmallValid: Ember.computed('pathValid', function(){
    return this.get('pathValid');
  }),

  formSmallInvalid: Ember.computed.equal('formSmallValid', false)
});
