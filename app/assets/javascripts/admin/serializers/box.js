Aggregator.BoxSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    publications: {
      serialize: 'ids'
    },
    image: {
      serialize: 'ids'
    }
  },

  keyForAttribute: function (attr) {
    if (attr === "willDestroy") {
      return "_destroy";
    } else {
      return this._super(attr);
    }
  }
});
