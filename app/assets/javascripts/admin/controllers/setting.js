Aggregator.SettingController = Ember.Controller.extend({
  types: [
    {id: null, label: 'Все публикации'},
    {id: 'news', label: 'Новости'},
    {id: 'article', label: 'Статьи'},
    {id: 'slider', label: 'Слайдеры'}
  ],

  typeSelect: [
    {id: null, label: 'Выберите тип публикации'},
    {id: 'news', label: 'Новость'},
    {id: 'article', label: 'Статья'}//,
    //{id: 'slider', label: 'Слайдер'}
  ]
});
