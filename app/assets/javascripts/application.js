//= require jquery
//= require jquery_ujs
//= require getshare
//= require twitter/typeahead.min
//= require search
//= require ahoy

//= require_self

$(function(){
  ahoy.track("$page_visit", { page: window.location.toString() } );
});


$.ajax({
  url: "http://localhost:8080/urls",
  type: "POST",
  data: {
    path: "http://fireimp.ru/news/2016/03/20/vo-vremya-sxsw-raskrylis-podrobnosti-novoy-igry-pro-betmana"
  },
  success: function(data) {
    console.log(data);
  },
  error: function(data) {
    console.log(data);
  }
});
