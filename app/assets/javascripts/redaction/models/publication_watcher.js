Aggregator.PublicationWatcher = DS.Model.extend({
  publication: DS.belongsTo('publication'),

  users: DS.hasMany('user'),

  gotUsers: Ember.computed.notEmpty('users'),

  usersString: Ember.computed('users.[]', function(){
    var array = this.get('users').map(function(user){ return user.get('name') });
    return array.join(', ')
  })
});
