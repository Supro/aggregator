Aggregator.User = DS.Model.extend({
  name:                 DS.attr('string'),
  password:             DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  email:                DS.attr('string'),
  slug:                 DS.attr('string'),

  isChiefEditor:        DS.attr('boolean')
});
