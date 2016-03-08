//new GetShare({
//  root: $(".twitter"),
//  network: "twitter",
//  share: {
//    url: url,
//    message: url + ' ' + title,
//  }
//});

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

//new GetShare({
//  root: $(".googleplus"),
//  network: "googleplus",
//  share: {
//    url: url,
//    message: url + ' ' + title
//  }
//});

$(function(){
  var screen = $(window);
  var left = (screen.width()/2)-(600/2);
  var top = (screen.height()/2)-(150/2);

  $('.googleplus').click(function(){
    window.open("https://plus.google.com/share?url=" + url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'+', top='+top+', left='+left);
  });

  $('.twitter').click(function(){
    window.open("https://twitter.com/share?url=" + url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'+', top='+top+', left='+left);
  });
});
