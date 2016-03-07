(function() {
  var idNr,
    __slice = [].slice;

  idNr = 1;

  this.GetShare = (function() {
    function GetShare(options) {
      var gs, key, network, rootId, value, _base, _base1, _base2, _ref, _ref1, _ref10, _ref11, _ref12, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      gs = this;
      network = this.getNetworkDefaults((options != null ? options.network : void 0) || "");
      this.extend(this, {
        autoInit: true,
        popover: {
          width: "300px",
          height: "100px",
          position: "bottom right",
          attr: {
            "class": "getshare-popover"
          }
        },
        attr: {
          "id": "getshare-" + (idNr++),
          "class": "getshare"
        },
        button: {
          icon: {
            style: {
              "margin": "1px 2px",
              "height": "14px",
              "max-width": "12px"
            }
          },
          attr: {
            "class": "getshare-button"
          }
        },
        counter: {
          mode: "countUp",
          position: "inside",
          loader: "spinner",
          count: 0,
          countLoaded: false,
          attr: {
            "class": "getshare-counter"
          }
        }
      }, network, options);
      if (this.network === "vk") {
        window.VK = {};
        window.VK.Share = {};
        window.VK.Share.count = $.proxy(function(a, count) {
          return gs.counter.count = count;
        }, this);
      }
      (_base = this.button.attr).href || (_base.href = "");
      (_base1 = this.counter).query || (_base1.query = {});
      (_base2 = this.counter.query).url || (_base2.url = "");
      if (this.root == null) {
        rootId = "root-" + this.attr.id;
        document.write("<span id=\"" + rootId + "\"/>");
        this.root = $("#" + rootId);
      }
      this.elem = jQuery("<span></span>");
      this.switchElem = jQuery("<input type=\"checkbox\" id=\"cb-" + this.attr.id + "\"/>");
      this.elem.append(this.switchElem);
      this.switchElem.change(function() {
        var $popover, $this, checked, left, target, top, win;
        target = gs.popover.target || gs.attr.id;
        $this = jQuery(this);
        checked = $this.is(":checked");
        jQuery(".getshare input[type=checkbox]").attr("checked", false);
        if (checked && (gs.popover.content != null)) {
          $this.attr("checked", true);
          $popover = $("#" + gs.attr.id + " ." + gs.popover.attr["class"] + " > div");
          if ($popover.length <= 1) {
            $popover = gs.popover.elem.find("div");
          }
          return $popover.html(gs.replaceString(gs.popover.content));
        } else if (gs.popover.url != null) {
          left = (screen.width / 2) - (gs.popover.width / 2);
          top = (screen.height / 2) - (gs.popover.height / 2);
          options = "menubar=1,resizable=1,width=" + gs.popover.width + ",height=" + gs.popover.height + ",top=" + top + ",left=" + left;
          if (gs.popover.options === false) {
            options = null;
          }
          win = window.open(gs.replaceString(gs.popover.url), target, options);
          return win.focus();
        }
      });
      this.button.elem = jQuery("<label for=\"cb-" + this.attr.id + "\"/>");
      this.counter.elem = jQuery("<span/>");
      _ref = this.attr || {};
      for (key in _ref) {
        value = _ref[key];
        this.elem.attr(key, value);
      }
      _ref2 = ((_ref1 = this.button) != null ? _ref1.attr : void 0) || {};
      for (key in _ref2) {
        value = _ref2[key];
        this.button.elem.attr(key, value);
      }
      _ref4 = ((_ref3 = this.counter) != null ? _ref3.attr : void 0) || {};
      for (key in _ref4) {
        value = _ref4[key];
        this.counter.elem.attr(key, value);
      }
      if (((_ref5 = this.button) != null ? _ref5.icon : void 0) != null) {
        this.button.elem.addClass("getshare-icon");
      }
      if (this.network != null) {
        this.button.elem.addClass("getshare-button-" + this.network);
      }
      if (((_ref6 = this.button) != null ? _ref6.text : void 0) != null) {
        this.button.elem.append("<span class=\"getshare-text\">" + this.button.text + "</span>");
      }
      this.elem.append(this.button.elem);
      if (((_ref7 = this.counter) != null ? _ref7.mode : void 0) === "count" || ((_ref8 = this.counter) != null ? _ref8.mode : void 0) === "countUp" || ((_ref9 = this.counter) != null ? _ref9.mode : void 0) === "amount" || ((_ref10 = this.counter) != null ? _ref10.mode : void 0) === "amountUp") {
        if (this.counter.position === "splitBorder") {
          this.counter.position = "split border";
        }
        this.counter.elem.addClass(this.counter.position);
        if (this.counter.position === "bubble") {
          this.elem.append(this.counter.elem);
        } else {
          this.button.elem.append(this.counter.elem);
        }
      }
      if (gs.popover.content != null) {
        this.popover.elem = jQuery("<div>\n  <label for=\"cb-" + this.attr.id + "\">вњ–</label>\n  <div/>\n</div>");
        _ref12 = ((_ref11 = this.popover) != null ? _ref11.attr : void 0) || {};
        for (key in _ref12) {
          value = _ref12[key];
          this.popover.elem.attr(key, value);
        }
        this.popover.elem.addClass(this.popover.position);
        this.popover.elem.css("width", this.popover.width);
        this.popover.elem.css("height", this.popover.height);
        this.popover.elem.css("top", "-" + this.popover.height);
        this.elem.append(this.popover.elem);
      }
      this.root.append(this.elem);
      if (this.autoInit) {
        this.setUrl(this.share.url);
      }
    }

    GetShare.prototype.encode = function(str) {
      if (str == null) {
        return "";
      }
      return encodeURIComponent(str.toString()).replace(/'/g, "%27").replace(/"/g, "%22");
    };

    GetShare.prototype.setUrl = function(url, callback) {
      var gs;
      gs = this;
      this.share || (this.share = {});
      this.share.url = url || window.location.href;
      if (this.share.url.length > 8 && this.share.url.substr(8).indexOf("/") < 0) {
        this.share.url += "/";
      }
      this.share.encUrl = this.encode(this.share.url);
      this.share.encMessage = this.encode(this.share.message);
      this.share.encImageUrl = this.encode(this.share.imageUrl);
      this.counter.query.encUrl = this.replaceString(this.counter.query.url);
      this.button.elem.attr("href", this.replaceString(this.button.attr.href));
      if ((url != null) && this.network === "weibo" && url.indexOf("http://t.cn") === -1) {
        this.counter.query.encUrlShortener = this.replaceString(this.counter.query.urlShortener);
        $.getJSON(this.counter.query.encUrlShortener, function(res) {
          var _ref, _ref1;
          if ((res != null ? (_ref = res.data) != null ? (_ref1 = _ref.urls) != null ? _ref1[0].url_short : void 0 : void 0 : void 0) != null) {
            return gs.setUrl(res.data.urls[0].url_short, callback);
          } else {
            gs.counter.count = 404;
            return gs.updateCounterHtml();
          }
        });
        return;
      }
      return this.getCount(function(elem) {
        gs.updateCounterHtml();
        if (callback) {
          return $.proxy(callback, gs)(elem);
        }
      });
    };

    GetShare.prototype.extend = function() {
      var elements, src, srcKey, srcVal, target, _i, _len;
      target = arguments[0], elements = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      target || (target = {});
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        src = elements[_i];
        for (srcKey in src) {
          srcVal = src[srcKey];
          if (typeof srcVal === "object" && (srcVal != null) && (srcVal.length == null)) {
            target[srcKey] || (target[srcKey] = {});
            this.extend(target[srcKey], srcVal);
          } else {
            target[srcKey] = srcVal;
          }
        }
      }
      return target;
    };

    GetShare.prototype.updateCounterHtml = function() {
      var $counter, gs;
      gs = this;
      $counter = $("#" + this.attr.id + " ." + this.counter.attr["class"]);
      if ($counter.length <= 1) {
        $counter = this.counter.elem;
      }
      $counter.removeClass("getshare-loader");
      return $counter.html(this.convertCount(this.counter.count));
    };

    GetShare.prototype.getCount = function(callback) {
      var gs;
      gs = this;
      this.counter.elem.html("");
      this.counter.elem.addClass("getshare-loader");
      return $.getJSON(this.counter.query.encUrl, function(res) {
        var count, _ref, _ref1;
        if (res != null) {
          count = gs.extractCount(res, (((_ref = gs.counter) != null ? (_ref1 = _ref.query) != null ? _ref1.path : void 0 : void 0) || "").split("."));
        }
        if (count == null) {
          count = 0;
        }
        if (isNaN(count)) {
          count = 0;
        }
        gs.counter.count = count;
        if (callback != null) {
          return $.proxy(callback, gs)(res);
        }
      }).fail(function() {
        if (callback != null) {
          return $.proxy(callback, gs)();
        }
      });
    };

    GetShare.prototype.extractCount = function(item, query) {
      var count, field, subItem, _i, _len;
      count = 0;
      if ((item != null) && (query != null)) {
        if ($.isArray(item)) {
          for (_i = 0, _len = item.length; _i < _len; _i++) {
            subItem = item[_i];
            count += this.extractCount(subItem, query.slice());
          }
        } else if ($.isNumeric(item)) {
          count = item * 1;
        } else {
          field = query.shift();
          count = this.extractCount(item[field], query);
        }
      }
      return count;
    };

    GetShare.prototype.replaceString = function(str) {
      var key, rgx, value, _ref;
      _ref = this.share;
      for (key in _ref) {
        value = _ref[key];
        if ((value != null) && typeof value === "string") {
          rgx = new RegExp("{" + key + "}", "g");
          str = str.replace(rgx, value);
        }
      }
      return str;
    };

    GetShare.prototype.getCoinContent = function(name, urlhook) {
      return "<b>My " + name + " Address:</b><br/>\n<br/>\n<input class=\"getshare-coin-address\" type=\"text\" readonly onclick=\"this.select();\" value=\"{id}\"/><br/>\n<a class=\"getshare-coin-link\" href=\"" + urlhook + ":{id}\" target=\"_blank\">\n  send address to your wallet\n</a>";
    };

    GetShare.prototype.convertCount = function(n) {
      var str;
      str = (function() {
        switch (false) {
          case !(n >= 1000000000):
            return (n / 1000000).toFixed(0) + "M";
          case !(n >= 10000000):
            return (n / 1000000).toFixed(1) + "M";
          case !(n >= 1000000):
            return (n / 1000).toFixed(0) + "k";
          case !(n >= 10000):
            return (n / 1000).toFixed(1) + "k";
          default:
            return n.toFixed(0);
        }
      })();
      return str;
    };

    GetShare.prototype.getNetworkDefaults = function(network) {
      switch (network) {
        case "twitter":
          return {
            button: {
              attr: {
                title: "Share on Twitter"
              }
            },
            popover: {
              width: 550,
              height: 330,
              url: "http://twitter.com/home?status={encMessage}"
            },
            counter: {
              query: {
                url: "http://urls.api.twitter.com/1/urls/count.json?url={encUrl}&callback=?",
                path: "count"
              }
            }
          };
        case "twitterProfile":
          return {
            button: {
              attr: {
                title: "View Profile on Twitter"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://twitter.com/{id}"
            },
            counter: {
              query: {
                url: "http://api.getshar.es/counts/twitterProfile/{id}/?callback=?",
                path: "followers_count"
              }
            }
          };
        case "facebook":
          return {
            button: {
              attr: {
                title: "Share on Facebook"
              }
            },
            popover: {
              width: 550,
              height: 270,
              url: "http://www.facebook.com/share.php?u={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='{encUrl}'&format=json&callback=?",
                path: "total_count"
              }
            }
          };
        case "facebookFollower":
          return {
            button: {
              attr: {
                title: "View Profile on Facebook"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "http://www.facebook.com/{id}"
            },
            counter: {
              query: {
                url: "https://graph.facebook.com/{id}?callback=?",
                path: "likes"
              }
            }
          };
        case "googleplus":
          return {
            button: {
              attr: {
                title: "Share on Google+"
              }
            },
            popover: {
              width: 550,
              height: 475,
              url: "https://plus.google.com/share?url={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "http://api.getshar.es/counts/googleplus/{encUrl}/?callback=?",
                path: ""
              }
            }
          };
        case "vk":
          return {
            button: {
              attr: {
                title: "Share on VKontakte"
              }
            },
            popover: {
              width: 550,
              height: 350,
              url: "http://vk.com/share.php?url={encUrl}"
            },
            counter: {
              query: {
                url: "http://vk.com/share.php?act=count&index=1&url={encUrl}&format=json&callback=?",
                path: ""
              }
            }
          };
        default:
          return {};
      }
    };

    return GetShare;

  })();

}).call(this);
