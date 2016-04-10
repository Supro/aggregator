Aggregator.User = DS.Model.extend({
  name:                 DS.attr('string'),
  password:             DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  email:                DS.attr('string'),
  slackChat:            DS.attr('string'),
  slug:                 DS.attr('string'),
  about:                DS.attr('string'),
  userId:               DS.attr('number'),
  rate:                 DS.attr('number'),

  role:                 DS.attr('string'),

  isChiefEditor:        Ember.computed.equal('role', 'chief_editor'),
  isEditor:             Ember.computed.equal('role', 'editor'),
  isJuniorJournalist:   Ember.computed.equal('role', 'junior_journalist'),
  isJournalist:         Ember.computed.equal('role', 'journalist'),

  nameMinLength: 3,
  nameMaxLength: 70,
  nameValid: Ember.computed('name', function(){
    return this.get('name.length') > this.get('nameMinLength') &&
           this.get('name.length') < this.get('nameMaxLength');
  }),

  nameSymbols: Ember.computed('name', function(){
    return this.get('name.length') || 0;
  }),

  nameTitle: Ember.computed('name', function(){
    return "ФИО (" + this.get('nameSymbols') + "/" + this.get('nameMaxLength') + ")";
  }),

  emailMinLength: 3,
  emailMaxLength: 70,
  emailValid: Ember.computed('email', function(){
    return this.get('email.length') > this.get('emailMinLength') &&
           this.get('email.length') < this.get('emailMaxLength');
  }),

  emailSymbols: Ember.computed('email', function(){
    return this.get('email.length') || 0;
  }),

  emailTitle: Ember.computed('email', function(){
    return "Почта (" + this.get('emailSymbols') + "/" + this.get('emailMaxLength') + ")";
  }),

  slackChatMinLength: 3,
  slackChatMaxLength: 70,
  slackChatValid: Ember.computed('slackChat', function(){
    return this.get('slackChat.length') > this.get('slackChatMinLength') &&
           this.get('slackChat.length') < this.get('slackChatMaxLength');
  }),

  slackChatSymbols: Ember.computed('slackChat', function(){
    return this.get('slackChat.length') || 0;
  }),

  slackChatTitle: Ember.computed('slackChat', function(){
    return "Чат в slack (" + this.get('slackChatSymbols') + "/" + this.get('slackChatMaxLength') + ")";
  }),

  aboutMinLength: 3,
  aboutMaxLength: 160,
  aboutValid: Ember.computed('about', function(){
    return this.get('about.length') > this.get('aboutMinLength') &&
           this.get('about.length') < this.get('aboutMaxLength');
  }),

  aboutSymbols: Ember.computed('about', function(){
    return this.get('about.length') || 0;
  }),

  aboutTitle: Ember.computed('about', function(){
    return "О авторе (" + this.get('aboutSymbols') + "/" + this.get('aboutMaxLength') + ")";
  })
});
