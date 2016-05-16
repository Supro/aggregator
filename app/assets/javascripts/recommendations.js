function once(fn, context) {
	var result;

	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

(function($) {
  var selectors = [];

  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  };
  var $window = $(window);

  var $prior_appeared = [];

  function appeared(selector) {
    return $(selector).filter(function() {
      return $(this).is(':appeared');
    });
  }

  function process() {
    check_lock = false;
    for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
      var $appeared = appeared(selectors[index]);

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared[index]) {
        var $disappeared = $prior_appeared[index].not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared[index] = $appeared;
    }
  }

  function add_selector(selector) {
    selectors.push(selector);
    $prior_appeared.push();
  }

  // "appeared" custom filter
  $.expr[':'].appeared = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  };

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      add_selector(selector);
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      }
      return false;
    }
  });
})(function() {
  if (typeof module !== 'undefined') {
    // Node
    return require('jquery');
  } else {
    return jQuery;
  }
}());


$(function(){
  var id = recommendations.shift();

  findPublication(id, publicationId);

  var selector = '.publication_' + publicationId;

  $(selector).appear();
  $(selector).on('appear', function(event, $all_appeared_elements) {
    if ($('head title').text() != publicationTitle) {
      history.pushState({}, publicationTitle, publicationTypePath);
      $('head title').text(publicationTitle);

      var st = $('.sticky').detach();

      $(selector).find('.publication-right').append(st);
    }
  });
});

var findPublication = function(id, publicationId){
  $.ajax({
    url: '/api/v1/recommendations/' + id,
    dataType: 'JSON',
    data: {
      publication_id: publicationId
    },
    success: function(data){
      renderPublication(data.publication);
    }
  });
}

var renderPublication = function(publication) {
  var html = ""
  var body = JSON.parse(publication.body.replace(/&lt;/, "<").replace(/&gt;/, ">"))

  if (publication.type === 'news') {
    html += '<div class="publication-show marged news publication_' + publication.id + '">'
  } else if (publication.type === 'video') {
    html += '<div class="publication-show marged video publication_' + publication.id + '">'
  } else if (publication.type === 'guide') {
    html += '<div class="publication-show marged guide publication_' + publication.id + '">'
  } else if (publication.type === 'article') {
    html += '<div class="publication-show marged article publication_' + publication.id + '">'
  }

    html += '<div class="publication-top">'
      html += '<div class="background" '

      if (publication.background != null) {
        html += 'style="background-image: url(' +publication.background.url+ ');">'
      } else {
        html += 'style="background-image: url(' +publication.poster.url+ ');">'
      }

        html += '<div class="inner-block">'
          html += '<div class="info">'
            html += '<div class="share visible-md visible-lg">'
              html += '<a class="googleplus googleplus' + "_" + publication.id +'">'
                html += '<div class="getshare-5 getshare">'
                  html += '<input type="checkbox" id="cb-getshare-5">'
                    html += '<label  for="cb-getshare-5" class="getshare-button getshare-icon getshare-button-googleplus" title="Share on Google+" href=""></label>'
                    html += '<span class="getshare-counter inside" style="width: 10px;"></span>'
                  html += '</input>'
                html += '</div>'
              html += '</a>'
              html += '<a class="twitter twitter' + "_" + publication.id +'">'
                html += '<div class="getshare-6 getshare">'
                  html += '<input type="checkbox" id="cb-getshare-6">'
                    html += '<label  for="cb-getshare-6" class="getshare-button getshare-icon getshare-button-twitter" title="Share on twitter" href=""></label>'
                    html += '<span class="getshare-counter inside" style="width: 10px;"></span>'
                  html += '</input>'
                html += '</div>'
              html += '</a>'
              html += '<a class="facebook facebook' + "_" + publication.id +'">'
              html += '</a>'
              html += '<a class="vk vk' + "_" + publication.id +'">'
              html += '</a>'
            html += '</div>'
            if(publication.type === 'news') {
              html += '<div class="source">'
                html += '<i class="fa fa-television" style="color:' + publication.type_color + ';"></i>'
                $.each(publication.urls, function(index, url){
                  html += '<a href="' + url.path + '" rel="nofollow" target="_blank" >' + url.source.title.toUpperCase() + '</a>'
                });
              html += '</div>'
            }
            html += '<div class="time">'
              html += '<i class="fa fa-calendar-o" style="color:' + publication.type_color + ';"></i>'
              html += '<time>' + publication.time + '</time>'
            html += '</div>'
          html += '</div>'
          html += '<div class="inner-content col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">'
            html += '<div class="holder">'
              html += '<h1>' + publication.title + '</h1>'
              html += '<h2>' + publication.sub_title + '</h2>'
            html += '</div>'
          html += '</div>'
        html += '</div>'
      html += '</div>'
    html += '</div>'
      html += '<div class="col-lg-8 col-md-8 publication-left">'
        html += '<div class="content">'
          html += '<div class="context">'
            html += publication.context
          html += '</div>'
          html += '<div class="body">'
            $.each(body, function(index, elem){
              //console.log(elem);
              if (elem.type === 'paragraph') {
                html += '<p>'
                html += elem.content
                html += '</p>'
              } else if (elem.type === 'heading') {
                html += '<h3 class="heading_' + elem.position + '" position="' + elem.position + '">'
                html += elem.content
                html += '</h3>'
              } else if (elem.type === 'tweet') {
                html += '<div class="embed-tweet">'
                html += elem.content.html
                html += '</div>'
              } else if (elem.type === 'quote') {
                html += '<div class="quote-block">'
                  html += '<a class="quote" target="_blank" rel="nofollow" href="' + elem.content.link + '">'
                    html += '<div class="quote-text">'
                      html += elem.content.text
                    html += '</div>'
                    html += '<div class="quote-source">'
                      html += '<i class="fa fa-quote-left" />'
                      html += elem.content.source
                    html += '</div>'
                  html += '</a>'
                html += '</div>'
              } else if (elem.type === 'video') {
                html += '<div class="youtube-box">'
                  html += '<div class="youtube_iframe">'
                    var youtubeId = '';

                    if (/youtube.com/.test(elem.content.source)) {
                      var arr = elem.content.source.split('=')
                      youtubeId = arr[arr.length - 1];
                    } else {
                      var arr = elem.content.source.split('/')
                      youtubeId = arr[arr.length - 1];
                    }

                    html += '<iframe allowfullscreen="true" frameborder="0" class="youtube-video" src="//www.youtube.com/embed/' + youtubeId + '">'
                    html += '</iframe>'

                  html += '</div>'
                html += '</div>'
              } else if (elem.type === 'image') {
                html += '<a class="image-block image_' + elem.position + '" target="_blank" rel="nofollow" href="' + elem.content.link + '">'
                  var style = '';

                  if (elem.content.width != '') {
                    style += 'max-width: ' + elem.content.width + 'px;'
                  }

                  if (elem.content.height != '') {
                    style += 'max-height: ' + elem.content.height + 'px;'
                  }

                  html += '<img src="' + elem.content.url + '" alt="' + elem.content.alt + '" style="' + style + '">'
                  if (elem.content.alt != '') {
                    html += '<div class="alt">'
                      html += elem.content.alt
                    html += '</div>'
                  }
                  if (elem.content.source != '') {
                    html += '<div class="source">'
                      html += elem.content.source
                    html += '</div>'
                  }
                html += '</a>'
              }
            });
        html += '</div>'
      html += '</div>'
    html += '</div>'
    html += '<div class="col-lg-4 col-md-4 publication-right visible-md visible-lg">'
      //html += '<div class="sticky">'
      //html += '</div>'
    html += '</div>'
    html += '<div class="col-lg-12 col-md-12 share bottom">'
      html += '<a class="googleplus googleplus' + "_" + publication.id +'">'
        html += '<div class="getshare-5 getshare">'
          html += '<input type="checkbox" id="cb-getshare-5">'
            html += '<label  for="cb-getshare-5" class="getshare-button getshare-icon getshare-button-googleplus" title="Share on Google+" href=""></label>'
            html += '<span class="getshare-counter inside" style="width: 10px;"></span>'
          html += '</input>'
        html += '</div>'
      html += '</a>'
      html += '<a class="twitter twitter' + "_" + publication.id +'">'
        html += '<div class="getshare-6 getshare">'
          html += '<input type="checkbox" id="cb-getshare-6">'
            html += '<label  for="cb-getshare-6" class="getshare-button getshare-icon getshare-button-twitter" title="Share on twitter" href=""></label>'
            html += '<span class="getshare-counter inside" style="width: 10px;"></span>'
          html += '</input>'
        html += '</div>'
      html += '</a>'
      html += '<a class="facebook facebook' + "_" + publication.id +'">'
      html += '</a>'
      html += '<a class="vk vk' + "_" + publication.id +'">'
      html += '</a>'
    html += '</div>'
    html += '<div class="col-lg-12 col-md-12 recommendations hidden-xs">'
      $.each(publication.recommended_publications, function(index, pub){
        var cc = '';

        if (index > 5) {
          cc = 'visible-lg visible-md';
        }

        html += '<a class="publication-inner col-lg-3 col-md-3 col-sm-4 ' + cc + '" href="' + pub.full_url + '" oncontextmenu="yaCounter28115085.reachGoal(\'RecommendationClick\');" keydown="yaCounter28115085.reachGoal(\'RecommendationClick\');" onclick="yaCounter28115085.reachGoal(\'RecommendationClick\');">'
          html += '<div class="black-background">'
            html += '<div class="img" style="background-image: url(' + pub.thumb + ');">'
            html += '</div>'
            html += '<div class="info">'
              html += '<h3>'
              html += pub.title
              html += '</h3>'
            html += '</div>'
          html += '</div>'
        html += '</a>'
      });
    html += '</div>'
  html += '</div>'


  $('.publication-show').last().after(html);

  new GetShare({
    root: $(".facebook" + "_" + publication.id),
    network: "facebook",
    share: {
      url: window.location.href,
      message: window.location.href + ' ' + $('head title').text()
    }
  });

  new GetShare({
    root: $(".vk" + "_" + publication.id),
    network: "vk",
    share: {
      url: window.location.href
    }
  });

  $(function(){
    var screen = $(window);
    var left = (screen.width()/2)-(600/2);
    var top = (screen.height()/2)-(150/2);

    $('.googleplus' + "_" + publication.id).click(function(){
      window.open("https://plus.google.com/share?url=" + window.location.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'+', top='+top+', left='+left);
    });

    $('.twitter' + "_" + publication.id).click(function(){
      window.open("https://twitter.com/share?url=" + window.location.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'+', top='+top+', left='+left);
    });

    var selector = '.publication_' + publication.id;

    $(selector).appear();
    $(selector).on('appear', function(event, $all_appeared_elements) {
      if ($('head title').text() != publication.title) {
        history.pushState({}, publication.title, publication.type_path);
        $('head title').text(publication.title);

        var st = $('.sticky').detach();

        $(selector).find('.publication-right').append(st);

        once(function() {
          var id = recommendations.shift();

          if (id != undefined) {
            findPublication(id, publicationId);

            ga('send', 'pageview');
            yaCounter28115085.hit(publication.type_path);
            ahoy.track("$page_visit", { page: window.location.toString() } );
          }
        })();
      }
    });
  });
};
