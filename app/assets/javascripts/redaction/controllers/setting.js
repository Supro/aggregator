Aggregator.SettingController = Ember.Controller.extend({
  types: [
    {id: null, label: 'Все публикации'},
    {id: 'news', label: 'Новости'},
    {id: 'guide', label: 'Гайды'},
    {id: 'video', label: 'Видео'},
    {id: 'article', label: 'Статьи'}//,
    //{id: 'slider', label: 'Слайдеры'}
  ],

  states: [
    {id: 'pending', label: 'Ожидают утверждения'},
    {id: 'approved', label: 'Утверждены'},
  ],

  typeSelect: [
    {id: null, label: 'Выберите тип публикации'},
    {id: 'news', label: 'Новость'},
    {id: 'guide', label: 'Гайд'},
    {id: 'video', label: 'Видео'},
    {id: 'article', label: 'Статья'}//,
    //{id: 'slider', label: 'Слайдер'}
  ]
});
