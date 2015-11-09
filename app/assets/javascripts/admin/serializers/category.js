Aggregator.CategorySerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    lines: {
      serialize: 'records'
    }
  },

  keyForAttribute: function (attr) {
    if (attr === "lines") {
      return "lines_attributes";
    } else {
      return this._super(attr);
    }
  }
});
