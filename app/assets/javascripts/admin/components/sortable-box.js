Aggregator.SortableBoxComponent = Ember.Component.extend({
  classNames: ['box'],
  classNameBindings: ['box.type', 'byLineType'],
  attributeBindings: ['data-id', 'style'],
  'data-id': Ember.computed.reads('box.id'),
  publicationsSorting: ['position:asc'],
  publicationsSorted: Ember.computed.sort('box.publications', 'publicationsSorting'),

  style: Ember.computed('box.image', function(){
    if (Ember.isPresent(this.get('box.image'))) {
      return new Ember.Handlebars.SafeString("background-image: url(" + this.get("box.image.url") + ");");
    } else {
      return '';
    }
  }),

  gotImage: Ember.computed('box.image', function(){
    return Ember.isPresent(this.get('box.image.id'));
  }),

  byLineType: Ember.computed('lineType', function(){
    switch (this.get('lineType')) {
      case 'one':
        return "col-lg-12 col-md-12"
        break;
      case 'two':
        return "col-lg-6 col-md-6"
        break;
      case 'three':
        return "col-lg-4 col-md-4"
        break;
      case 'four':
        return "col-lg-3 col-md-3"
        break;
    }
  }),

  showTitleInput: Ember.computed('box.type', 'lineType', function(){
    return ['five'].contains(this.get('box.type')) && ['one'].contains(this.get('lineType')) ||
           ['three'].contains(this.get('box.type')) && ['two'].contains(this.get('lineType'));
  }),

  showImageInput: Ember.computed('box.type', 'lineType', function(){
    return ['one', 'five'].contains(this.get('box.type')) && ['one'].contains(this.get('lineType')) ||
           ['one', 'three'].contains(this.get('box.type')) && ['two'].contains(this.get('lineType'));
  }),

  showTypeOne: Ember.computed('box.type', 'lineType', function(){
    return ['one', 'two'].contains(this.get('lineType'));
  }),

  showTypeThree: Ember.computed('box.type', 'lineType', function(){
    return ['two'].contains(this.get('lineType'));
  }),

  showTypeFive: Ember.computed('box.type', 'lineType', function(){
    return ['one'].contains(this.get('lineType'));
  }),

  isTypeOne: Ember.computed('box.type', function(){
    return ['one'].contains(this.get('box.type'));
  }),

  isTypeThree: Ember.computed('box.type', function(){
    return ['three'].contains(this.get('box.type'));
  }),

  isTypeFive: Ember.computed('box.type', function(){
    return ['five'].contains(this.get('box.type'));
  }),

  sortableObserver: Ember.observer('box.type', 'box.publications.[]', 'initFire', function(){
    //Ember.run.once(this, 'sortableObserver', function(){
      //console.log('type');
      if (this.get('box.type') === 'one'){
        if (this.get('box.publications.length') >= 1) {
          this.$().find('.box-list').sortable('disable');
        } else {
          this.$().find('.box-list').sortable('enable');
        }
      } else if (this.get('box.type') === 'three') {
        if (this.get('box.publications.length') >= 3) {
          this.$().find('.box-list').sortable('disable');
        } else {
          this.$().find('.box-list').sortable('enable');
        }
      } else if (this.get('box.type') === 'five') {
        if (this.get('box.publications.length') >= 5) {
          this.$().find('.box-list').sortable('disable');
        } else {
          this.$().find('.box-list').sortable('enable');
        }
      }
    //});
  }),

  didInsertElement: function(){
    var _this = this;

    this.$().find('.image-add-fake').click(function(event){
      event.preventDefault();
      _this.$().find('.image-add').click();
    })

    this.$().find('.image-add').fileupload({
      url: '/api/v1/images',
      dataType: 'json',
      //formData: {
      //  posterable_type: 'Item'
      //},
      done: function(e, data){
        _this.store.find('image', data.result.image.id).then(function(image){
          _this.get('box').set('image', image);
        });
        //$('#item_poster_id').val(data.result.id);
        //$('#poster-placeholder').html("<img src=\"" + data.result.file.url + "\" />");
        setTimeout(function(){
          _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
          _this.$().find('.progress .progress-bar').css({'width': '0%'});
        }, 1000);
      },
      start: function () {
        _this.$().find('.error').css({'display': 'none'});
        _this.$().find('.progress').css({'opacity': '1', 'display': 'block'});
      },
      progressall: function(e, data){
        _this.$().find('.progress .progress-bar');
        _this.$().find('.progress .progress-bar').css({'width': parseInt(data.loaded / data.total * 100, 10) + '%'});
      },
      fail: function(e, data){
        if (data.jqXHR.responseJSON != undefined) {
          _this.$().find('.error').css({'display': 'block'}).text(data.jqXHR.responseJSON.errors.file[0]);
        } else {
          _this.$().find('.error').css({'display': 'block'}).text('Критическая ошибка');
        }
        _this.$().find('.progress').css({'opacity': '0', 'display': 'none'});
        _this.$().find('.progress .progress-bar').css({'width': '0%'});
      }
    });

    this.$().find('.box-list').sortable({
      //connectWith: '.box-list',
      update: function(event, ui){
        _this.$().find('.box-list').sortable('disable');

        var id = ui.item.data('id');
        ui.item.remove();

        _this.store.find('publication', id).then(function(publication){
          publication.set('box', _this.get('box'));
          _this.get('box.publications').pushObject(publication);
          _this.toggleProperty('fakeFire');
          //var boxIds = publication.get('boxIds');
          //boxIds.pushObject(_this.get('box.id'));

          //var categoryIds = publication.get('categoryIds');
          //categoryIds.pushObject(_this.get('category.id'));

          //publication.set('boxIds', boxIds);
          //publication.set('categoryIds', categoryIds);
          //publication.save().then(function(publication){
          //  _this.get('box').reload();
          //  _this.$().children('.box-list').sortable('enable');
          //});
        });
      }
    });

    this.set('initFire', true);
  },

  actions: {
    setType: function(type){
      var box = this.get('box');

      box.set('type', type);

      publications = box.get('publications');

      switch (box.get('type')) {
        case 'one':
          box.get('publications').slice(1, publications.get('length')).forEach(function(publication){
            publication.set('box', null);
            box.get('publications').removeObject(publication);
          });
          break;
        case 'two':
          box.get('publications').slice(2, publications.get('length')).forEach(function(publication){
            publication.set('box', null);
            box.get('publications').removeObject(publication);
          });
          break;
        case 'three':
          box.get('publications').slice(3, publications.get('length')).forEach(function(publication){
            publication.set('box', null);
            box.get('publications').removeObject(publication);
          });
          break;
        case 'four':
          box.get('publications').slice(4, publications.get('length')).forEach(function(publication){
            publication.set('box', null);
            box.get('publications').removeObject(publication);
          });
          break;
      }

      this.toggleProperty('fakeFire');

      //box.save();
    },

    removeImage: function(){
      this.get('box').set('image', null)
    }
  }
});
