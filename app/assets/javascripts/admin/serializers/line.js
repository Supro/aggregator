Aggregator.LineSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    boxes: {
      serialize: 'records'
    }
  },

  keyForAttribute: function (attr) {
    if (attr === "boxes") {
      return "boxes_attributes";
    } else if (attr === "willDestroy") {
      return "_destroy";
    } else {
      return this._super(attr);
    }
  }
});
