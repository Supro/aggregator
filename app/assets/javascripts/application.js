//= require jquery
//= require jquery_ujs
//= require getshare
//= require twitter/typeahead.min
//= require search

//= require_self

$(function(){
  $('.loader').hide();
});

var url = "";
var title = "";

new GetShare({
  root: $(".twitter"),
  network: "twitter",
  share: {
    url: url,
    message: url + ' ' + title,
  }
});

new GetShare({
  root: $(".facebook"),
  network: "facebook",
  share: {
    url: url,
    message: url + ' ' + title
  }
});

new GetShare({
  root: $(".vk"),
  network: "vk",
  share: {
    url: url
  }
});

new GetShare({
  root: $(".googleplus"),
  network: "googleplus",
  share: {
    url: url,
    message: url + ' ' + title
  }
});
