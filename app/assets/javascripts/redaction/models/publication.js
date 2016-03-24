Aggregator.Publication = DS.Model.extend(Aggregator.Timeable, Aggregator.ApproveTimeable, {
  box:                DS.belongsTo('box'),
  source:             DS.belongsTo('source'),
  publicationLock:    DS.belongsTo('publication-lock'),
  publicationWatcher: DS.belongsTo('publication-watcher'),
  poster:             DS.belongsTo('image'),
  background:         DS.belongsTo('image'),
  creator:            DS.belongsTo('user'),
  editor:             DS.belongsTo('user'),

  slides: DS.hasMany('slide'),
  images: DS.hasMany('image'),
  urls:   DS.hasMany('url'),

  categoryIds: DS.attr('array'),
  boxIds:      DS.attr('array'),

  position: DS.attr('number'),

  slug:     DS.attr('string'),
  state:    DS.attr('string'),
  type:     DS.attr('string'),
  title:    DS.attr('string'),
  subTitle: DS.attr('string'),
  context:  DS.attr('string'),
  body:     DS.attr('string'),
  url:      DS.attr('string'),

  totalVisits: DS.attr('number'),
  canApprove: DS.attr('boolean'),

  slidesActive: Ember.computed('slides.@each.willDestroy', 'lines.@each.position', 'fakeFire', function(){
    var slides = this.get('slides');
    slides = slides.filterBy('willDestroy', false);
    //slides = slides.sortBy('position');
    return slides;
  }),

  isOnMain: Ember.computed('boxIds', 'categoryIds', function(){
    return Ember.isPresent(this.get('boxIds')) || Ember.isPresent(this.get('categoryIds'))
  }),

  isSlide: Ember.computed.equal('type', 'slider'),
  isNews:  Ember.computed.equal('type', 'news'),
  isArticle: Ember.computed.equal('type', 'article'),
  isVideo: Ember.computed.equal('type', 'video'),
  isGuide: Ember.computed.equal('type', 'guide'),

  isApproved: Ember.computed.equal('state', 'approved'),
  isPending:  Ember.computed.equal('state', 'pending'),

  isNeedText: Ember.computed('type', function(){
    return this.get('isNews') || this.get('isGuide') || this.get('isArticle');
  }),

  typeValid:       Ember.computed.notEmpty('type'),
  posterValid:     Ember.computed.notEmpty('poster.id'),
  backgroundValid: Ember.computed(function(){
    return true;
  }),

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
    return this.get('title.length') || 0;
  }),

  titleTitle: Ember.computed('title', function(){
    return "Заголовок (" + this.get('titleSymbols') + "/" + this.get('titleMaxLength') + ")";
  }),

  slugMinLength: 3,
  slugMaxLength: 70,
  slugValid: Ember.computed('slug', function(){
    return this.get('slug.length') > this.get('slugMinLength') &&
           this.get('slug.length') < this.get('slugMaxLength');
  }),

  slugSymbols: Ember.computed('slug', function(){
    return this.get('slug.length') || 0;
  }),

  slugTitle: Ember.computed('slug', function(){
    return "Ссылка (" + this.get('slugSymbols') + "/" + this.get('slugMaxLength') + ")";
  }),

  subTitleMinLength: 3,
  subTitleMaxLength: 120,
  subTitleValid: Ember.computed('subTitle', function(){
    return this.get('subTitle.length') > this.get('subTitleMinLength') &&
           this.get('subTitle.length') < this.get('subTitleMaxLength');
  }),

  subTitleSymbols: Ember.computed('subTitle', function(){
    return this.get('subTitle.length') || 0;
  }),

  subTitleTitle: Ember.computed('subTitle', function(){
    return "Подзаголовок (" + this.get('subTitleSymbols') + "/" + this.get('subTitleMaxLength') + ")";
  }),

  contextMinLength: 100,
  contextMaxLength: 200,
  contextValid: Ember.computed('context', function(){
    return this.get('context.length') > this.get('contextMinLength') &&
           this.get('context.length') < this.get('contextMaxLength');
  }),

  contextSymbols: Ember.computed('context', function(){
    return this.get('context.length') || 0;
  }),

  contextTitle: Ember.computed('context', function(){
    return "Контекст (" + this.get('contextSymbols') + "/" + this.get('contextMaxLength') + ")";
  }),

  bodyMinLength: 3,
  bodyValid: Ember.computed('body', function(){
    if (this.get('isSlide')) {
      return true;
    } else if (this.get('isVideo')) {
      var regexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      return regexp.test(this.get('body'))
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
                            'typeValid',
                            'subTitleValid',
                            'contextValid',
                            'bodyValid',
                            'sourceValid',
                            'posterValid',
                            'slidesValid', function(){
    return this.get('titleValid') &&
           this.get('typeValid') &&
           this.get('subTitleValid') &&
           this.get('contextValid') &&
           this.get('bodyValid') &&
           this.get('sourceValid') &&
           this.get('posterValid') &&
           this.get('slidesValid');
  }),

  formInvalid: Ember.computed.equal('formValid', false),

  formSmallValid: Ember.computed('titleValid',
                                 'typeValid',
                                 'sourceValid', function(){
    return this.get('titleValid') &&
           this.get('typeValid') &&
           this.get('sourceValid');
  }),

  formSmallInvalid: Ember.computed.equal('formSmallValid', false)
});
