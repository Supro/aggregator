Aggregator.User = DS.Model.extend({
  name:                 DS.attr('string'),
  password:             DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  email:                DS.attr('string'),
  slug:                 DS.attr('string'),

  role:                 DS.attr('string'),

  isChiefEditor:      Ember.computed.equal('role', 'chief_editor'),
  isEditor:           Ember.computed.equal('role', 'editor'),
  isJuniorJournalist: Ember.computed.equal('role', 'junior_journalist'),
  isJournalist:       Ember.computed.equal('role', 'journalist')
});
