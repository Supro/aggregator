Aggregator.SourceSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    embedSources: {
      serialize: 'records'
    }
  },

  keyForAttribute: function (attr) {
    if (attr === "embedSources") {
      return "sources_attributes";
    } else if (attr === "willDestroy") {
      return "_destroy";
    } else {
      return this._super(attr);
    }
  }
});

Aggregator.EmbedSourceSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  keyForAttribute: function (attr) {
    if (attr === "willDestroy") {
      return "_destroy";
    } else {
      return this._super(attr);
    }
  }
});
