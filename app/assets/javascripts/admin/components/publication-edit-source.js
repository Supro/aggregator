Aggregator.PublicationEditSourceComponent = Aggregator.PublicationEditInputComponent.extend({
  model_id: Ember.computed.alias('model.id'),
  field: 'url',
  valuesTimeout: null,

  publications: [],
  parentSource: null,
  fakeTrigger: false,

  newSource: Ember.computed('parentSource', function(){
    var _this = this;

    if (this.get('gotParentSource')) {
      var newSource = this.store.createRecord('embedSource', {source: _this.get('parentSource'), type: 'child', url: _this.get('model.url')});
      this.get('parentSource.embedSources').unshiftObject(newSource);
      return newSource;
    }
  }),

  gotParentSource: Ember.computed.notEmpty('parentSource'),

  fakeTermObserver: Ember.observer('fakeTerm', function(){
    var _this = this;

    clearTimeout(this.get('valuesTimeout'));

    this.set('valuesTimeout', setTimeout(function(){
      _this.set('term', _this.get('fakeTerm'));
    }, 500));
  }),

  termObserver: Ember.observer('term', function(){
    this.findPublications({term: this.get('term')});
  }),

  gotPublications: Ember.computed.gt('publications.length', 0),

  sourceObserver: Ember.observer('model.url', 'fakeTrigger', function(){
    var _this = this;

    if (Ember.isPresent(this.get('model.url')) && !this.get('model.sourceValid') && !this.get('model.publicationLock.urlByA')) {
      Ember.$.ajax({
        url: '/api/v1/sources/find_by_link',
        data: {
          link: this.get('model.url')
        },
        success: function(data){
          if (Ember.isPresent(data['errors'])) {
            _this.set('sourceError', data['errors']);
            if (_this.get('sourceErrorNotFound')) {
              _this.set('parentSource', _this.store.createRecord('source', {url: _this.get('model.url')}));
            } else if (_this.get('sourceErrorFoundAsParent')) {
              _this.store.find('source', data.source.source.id).then(function(source){
                _this.set('parentSource', source);
              });
            }
          } else {
            _this.set('sourceError', null);
            _this.set('parentSource', null);

            _this.store.find('source', data.source.id).then(function(source){
              _this.setSource(source);
              _this.findPublications({source_id: source.get('id'), except_id: _this.get('model.id')});
            })
          }
        }
      });
    }
  }),

  findPublications: function(query){
    var _this = this;

    this.store.query('publication', query).then(function(publications){
      _this.set('publications', publications);
    });
  },

  setSource: function(source){
    var hash = {action: 'update', id: this.get('model.id'), user_id: 1, data: {}};

    hash['data']['source_id'] = source.get('id');
    hash['data']['url'] = this.get('model.url');

    var json = JSON.stringify(hash);

    this.get('socket').send(json);
  },

  sourceError: null,
  gotSourceError: Ember.computed.notEmpty('sourceError'),
  sourceErrorNotFound: Ember.computed.equal('sourceError', "not found"),
  sourceErrorFoundAsParent: Ember.computed.equal('sourceError', "found as parent"),

  actions: {
    removeSource: function(){
      var hash = {action: 'update', id: this.get('model.id'), user_id: 1, data: {source: null, url: null}};

      var json = JSON.stringify(hash);

      this.get('socket').send(json);
    },

    updateSource: function(){
      var _this = this;
        _this.set('sourceSaving', true);

      this.get('parentSource').save().then(function(source){
        _this.set('sourceSaving', false);
        _this.toggleProperty('fakeTrigger');
      });
    }
  }
});
