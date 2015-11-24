// For more information see: http://emberjs.com/guides/routing/

Aggregator.Router.reopen({
  location: 'history'
})

Aggregator.Router.map(function() {
  this.route('admin', { resetNamespace: true }, function(){
    this.route('pages', { resetNamespace: true }, function(){
      this.route('show', { path: '/:link' });
    });

    this.route('sources', { resetNamespace: true }, function(){
      this.route('new', { path: '/new' });
      this.route('show', { path: '/:id' });
    });

    this.route('publications', { resetNamespace: true }, function(){
      this.route('index', { path: '/' }, function(){
        this.route('inner', { path: '/' });
      });
      this.route('new', { path: '/new' });
      this.route('show', { path: '/:id' });
      this.route('edit', { path: '/:id/edit' });
    });
  });
});
