Aggregator.Slide = DS.Model.extend({
  publication: DS.belongsTo('publication'),
  image: DS.belongsTo('image'),

  title: DS.attr('string'),
  body: DS.attr('string'),
  willDestroy: DS.attr('boolean', {defaultValue: false}),

  imageValid: Ember.computed.notEmpty('image.id'),

  titleMinLength: 3,
  titleMaxLength: 70,
  titleValid: Ember.computed('title', function(){
    return this.get('title.length') > this.get('titleMinLength') &&
           this.get('title.length') < this.get('titleMaxLength');
  }),

  titleSymbols: Ember.computed('title', function(){
    return this.get('title.length');
  }),

  bodyMinLength: 3,
  bodyValid: Ember.computed('body', function(){
    return this.get('body.length') > this.get('bodyMinLength');
  }),

  formValid: Ember.computed('titleValid',
                            'bodyValid',
                            'imageValid', function(){
    return this.get('titleValid') &&
           this.get('bodyValid') &&
           this.get('imageValid');
  }),

  formInvalid: Ember.computed.equal('formValid', false)
});
