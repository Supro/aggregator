Aggregator.PublicationSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    urls: {
      serialize: 'ids'
    },
    slides: {
      serialize: 'records'
    }//,
    //publicationLock: {
    //  serialize: 'records'
    //}//,
    //images: {
    //  serialize: 'records'
    //}
  },

  keyForAttribute: function (attr) {
    if (attr === "slides") {
      return "slides_attributes";
    } else if (attr === "publicationLock") {
      return "publication_lock_attributes";
    } else {
      return this._super(attr);
    }
  }
});
