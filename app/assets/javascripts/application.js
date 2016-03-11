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
