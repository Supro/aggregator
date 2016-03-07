// For more information see: http://emberjs.com/guides/routing/

Aggregator.Router.reopen({
  location: 'history'
})

Aggregator.Router.map(function() {
  this.route('redaction', { resetNamespace: true }, function(){
    this.route('main', { path: '/', resetNamespace: true });

    this.route('login', { path: '/login', resetNamespace: true });

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
    });
  });
});
