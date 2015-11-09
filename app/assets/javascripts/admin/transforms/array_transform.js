Aggregator.ArrayTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return (Ember.typeOf(serialized) === "array") ? serialized : null;
  },

  serialize: function(deserialized) {
    var type = Ember.typeOf(deserialized);
    if (type === 'array') {
      if (Ember.isEmpty(deserialized)) {
        return null;
      } else {
        return deserialized;
      }
    } else if (type === 'string') {
      return deserialized.split(',').map(function(item) {
        return Ember.$.trim(item);
      });
    } else {
      return null;
    }
  }
});
