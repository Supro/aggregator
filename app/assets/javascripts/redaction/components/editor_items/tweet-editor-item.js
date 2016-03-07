Aggregator.TweetEditorItemComponent = Aggregator.EditorItemComponent.extend({
  disabled: false,

  getIdFromSource: function(){
    var result = "", rt = /twitter/, rr = /[0-9]+$/;

    if (rt.test(this.get('source'))) {
      result = this.get('source').match(rr)[0]
    } else {
      result = this.get('source')
    }

    return result;
  },

  source: Ember.computed('body', function(){
    return this.get('content').source;
  }),

  html: Ember.computed('body', function(){
    return this.get('content').html;
  }),

  contentObserver: Ember.observer('source', function(){
    var _this = this;
    if (Ember.isPresent(this.get('source'))) {
      this.set('disabled', true);

      Ember.$.ajax({
        url: "/api/v1/tweets/" + _this.getIdFromSource(),
        dataType: "json",
        type: "GET",
        success: function(data) {
          _this.set('html', data.html);

          var content = {
            source: _this.get('source'),
            html: _this.get('html')
          };
          _this.updateContent(content);

          _this.set('disabled', false);
        },
        error: function(){
          _this.set('disabled', false);
        }
      });
    }
  })
});
