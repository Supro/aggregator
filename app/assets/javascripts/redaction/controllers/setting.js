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
    {id: 'pending', label: 'На утверждении'},
    {id: 'approved', label: 'Утверждены'},
    {id: 'declined', label: 'Отклонены'},
    {id: 'checking', label: 'На проверке'},
    {id: 'rework', label: 'На доработке'},
    {id: 'ready', label: 'Готовы к публикации'},
    {id: 'published', label: 'Опубликованы'}
  ],

  urlStates: [
    {id: 'new', label: 'Новые'},
    {id: 'lame', label: 'Неинтересные'},
    {id: 'intresting', label: 'Интересные'},
    {id: 'linked', label: 'Связанные с новостями'}
  ],

  typeSelect: [
    {id: null, label: 'Выберите тип публикации'},
    {id: 'guide', label: 'Гайд'},
    {id: 'video', label: 'Видео'},
    {id: 'article', label: 'Статья'}//,
    //{id: 'slider', label: 'Слайдер'}
  ]
});
