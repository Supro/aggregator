Aggregator.SlideSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    image: {
      serialize: 'ids'
    }
  },

  keyForAttribute: function (attr) {
    if (attr === "image") {
      return "image_attributes";
    } else if (attr === "willDestroy") {
       return "_destroy";
    } else {
      return this._super(attr);
    }
  }
});
