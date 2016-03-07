$(function(){
  var searchs = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 10,
    remote: {
      url: '/api/v1/search?term=%QUERY',
      wildcard: '%QUERY',
      filter: function(list) {
        return list.search;
      }
    }
  });

  searchs.initialize();

  $('#top-search').typeahead(null, {
    name: 'searchs',
    displayKey: 'name',
    source: searchs.ttAdapter(),
    templates: {
      empty: [
        '<div class="empty-message">',
        'По вашему запросу ничего не найдено',
        '</div>'
      ].join('\n'),
      suggestion: function(item){
        return '<a class="typeahead-element" href="' + item.full_url + '" target="_blank">' +
        '  <div class="typeahead-left" style="background-image: url(' + item.poster.thumb + ');"></div>' +
        '  <div class="typeahead-right">' +
        '    <div class="typeahead-title">' + item.title + '</div>' +
        '    <div class="typeahead-sub-title">' + item.sub_title + '</div>' +
        '    <div class="typeahead-type visible-md visible-lg" style="color:' + item.type_color + ';">' + item.type_name +'</div>' +
        '  </div>' +
        '</a>';
      }
    }
  });
});
