Aggregator.Publication = DS.Model.extend(Aggregator.Timeable, {
  box: DS.belongsTo('box'),
  source: DS.belongsTo('source'),
  publicationLock: DS.belongsTo('publication-lock'),

  slides: DS.hasMany('slide'),
  images: DS.hasMany('image'),

  categoryIds: DS.attr('array'),
  boxIds: DS.attr('array'),

  position: DS.attr('number'),

  slug: DS.attr('string'),
  type: DS.attr('string'),
  title: DS.attr('string'),
  subTitle: DS.attr('string'),
  context: DS.attr('string'),
  body: DS.attr('string'),
  url: DS.attr('string'),

  slidesActive: Ember.computed('slides.@each.willDestroy', 'lines.@each.position', 'fakeFire', function(){
    var slides = this.get('slides');
    slides = slides.filterBy('willDestroy', false);
    //slides = slides.sortBy('position');
    return slides;
  }),

  isSlide: Ember.computed.equal('type', 'slider'),
  isNews: Ember.computed.equal('type', 'news'),
  isArticle: Ember.computed.equal('type', 'article'),

  isNewsOrArticle: Ember.computed('type', function(){
    return this.get('isNews') || this.get('isArticle');
  }),

  typeValid: Ember.computed.notEmpty('type'),

  sourceValid: Ember.computed('source', function(){
    if (this.get('isNews')) {
      return Ember.isPresent(this.get('source.id'));
    } else {
      return true;
    }
  }),

  gotSlides: Ember.computed.gt('slides.length', 0),

  titleMinLength: 3,
  titleMaxLength: 70,
  titleValid: Ember.computed('title', function(){
    return this.get('title.length') > this.get('titleMinLength') &&
           this.get('title.length') < this.get('titleMaxLength');
  }),

  titleSymbols: Ember.computed('title', function(){
    return this.get('title.length');
  }),

  titleTitle: Ember.computed('title', function(){
    return "Заголовок (" + this.get('titleSymbols') + "/" + this.get('titleMaxLength') + ")";
  }),

  subTitleMinLength: 3,
  subTitleMaxLength: 120,
  subTitleValid: Ember.computed('subTitle', function(){
    return this.get('subTitle.length') > this.get('subTitleMinLength') &&
           this.get('subTitle.length') < this.get('subTitleMaxLength');
  }),

  subTitleSymbols: Ember.computed('subTitle', function(){
    return this.get('subTitle.length');
  }),

  subTitleTitle: Ember.computed('subTitle', function(){
    return "Подзаголовок (" + this.get('subTitleSymbols') + "/" + this.get('subTitleMaxLength') + ")";
  }),

  contextMinLength: 3,
  contextMaxLength: 160,
  contextValid: Ember.computed('context', function(){
    return this.get('context.length') > this.get('contextMinLength') &&
           this.get('context.length') < this.get('contextMaxLength');
  }),

  contextSymbols: Ember.computed('context', function(){
    return this.get('context.length');
  }),

  contextTitle: Ember.computed('context', function(){
    return "Контекст (" + this.get('contextSymbols') + "/" + this.get('contextMaxLength') + "70)";
  }),

  bodyMinLength: 3,
  bodyValid: Ember.computed('body', function(){
    if (this.get('isSlide')) {
      return true;
    } else {
      return this.get('body.length') > this.get('bodyMinLength');
    }
  }),

  slidesValid: Ember.computed('slides.@each.willDestroy', 'lines.@each.position', function(){
    if (this.get('isSlide')) {
      var check = true;

      if (!this.get('gotSlides')) {
        check = false
      }

      this.get('slide').forEach(function(slide){
        if (!slide.get('willDestroy')) {
          if (slide.get('formInvalid')) {
            check = false;
          }
        }
      });

      return check;
    } else {
      return true;
    }
  }),

  formValid: Ember.computed('titleValid',
                            'subTitleValid',
                            'contextValid',
                            'bodyValid',
                            'sourceValid',
                            'slidesValid', function(){
    return this.get('titleValid') &&
           this.get('subTitleValid') &&
           this.get('contextValid') &&
           this.get('bodyValid') &&
           this.get('sourceValid') &&
           this.get('slidesValid');
  }),

  formInvalid: Ember.computed.equal('formValid', false)
});
