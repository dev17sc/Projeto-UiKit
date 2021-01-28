(function() {
  var adm, cliente_support, currentAcl, current_cidade, getMousePositionFromClickedContainer,
    __slice = [].slice;

  this.currentFunctionName = function() {
    return currentFunctionName.caller.name;
  };

  this.markup = {
    bold: function(text, opts) {
      if (opts == null) {
        opts = {};
      }
      opts.mark || (opts.mark = '<b>%s</b>');
      return this.custom(text, opts);
    },
    custom: function(text, opts) {
      var regex, replacement;
      if (opts == null) {
        opts = {};
      }
      opts.marked || (opts.marked = 'markup');
      regex = new RegExp(opts.marked + "{(\S*(.*?\S*)?)}", 'g');
      replacement = opts.mark.replace('%s', '$1');
      return text.replace(regex, replacement).nl2br();
    }
  };

  this.I18n = {
    interpolate: function(text, opts) {
      var k, re, v;
      if (opts == null) {
        opts = {};
      }
      if (!opts) {
        return text;
      }
      for (k in opts) {
        v = opts[k];
        re = new RegExp("%{" + k + "}", 'g');
        if (text.match(re)) {
          text = text.replace(re, v);
        }
      }
      return this.bold(text, opts);
    },
    bold: function(text, opts) {
      if (opts == null) {
        opts = {};
      }
      return markup.bold(text, opts);
    },
    markup: function(text, opts) {
      if (opts == null) {
        opts = {};
      }
      return markup.custom(text, opts);
    }
  };

  this.isFile = function(val) {
    return !!val && typeof val === 'object' && val.constructor === File;
  };

  this.isObject = function(val) {
    return !!val && typeof val === 'object' && val.constructor === Object;
  };

  this.isArray = function(val) {
    return !!val && typeof val === 'object' && val.constructor === Array;
  };

  this.isNumber = function(val) {
    return typeof val === 'number' && isFinite(val);
  };

  this.isString = function(val) {
    return typeof val === 'string' || val instanceof String;
  };

  this.isFunction = function(val) {
    return typeof val === 'function';
  };

  this.isNull = function(val) {
    return [void 0, null].includes(val);
  };

  this.isBlank = function(val) {
    var arrayEmpty, objectEmpty;
    arrayEmpty = isArray(val) && val.empty();
    objectEmpty = isObject(val) && Object.empty(val);
    return isNull(val) || [''].includes(val) || arrayEmpty || objectEmpty;
  };

  this.isPresent = function(val) {
    return !isBlank(val);
  };

  this.trace = function(msg) {
    return window.console && console.log(msg);
  };

  this.openFullScreen = function(element, onChange, onError) {
    if (onChange == null) {
      onChange = null;
    }
    if (onError == null) {
      onError = null;
    }
    document.onwebkitfullscreenchange = onChange;
    document.onmozfullscreenchange = onChange;
    document.onmsfullscreenchange = onChange;
    document.onfullscreenchange = onChange;
    document.onwebkitfullscreenerror = onError;
    document.onmozfullscreenerror = onError;
    document.onmsfullscreenerror = onError;
    document.onfullscreenerror = onError;
    if (typeof element.webkitRequestFullscreen === "function") {
      element.webkitRequestFullscreen();
    }
    if (typeof element.mozRequestFullScreen === "function") {
      element.mozRequestFullScreen();
    }
    if (typeof element.msRequestFullscreen === "function") {
      element.msRequestFullscreen();
    }
    if (typeof element.requestFullscreen === "function") {
      element.requestFullscreen();
    }
  };

  this.closeFullScreen = function() {
    if (typeof document.webkitCancelFullScreen === "function") {
      document.webkitCancelFullScreen();
    }
    if (typeof document.webkitExitFullscreen === "function") {
      document.webkitExitFullscreen();
    }
    if (typeof document.mozCancelFullScreen === "function") {
      document.mozCancelFullScreen();
    }
    if (typeof document.msExitFullscreen === "function") {
      document.msExitFullscreen();
    }
    if (typeof document.cancelFullScreen === "function") {
      document.cancelFullScreen();
    }
    if (typeof document.exitFullscreen === "function") {
      document.exitFullscreen();
    }
  };

  this.isFullScreen = function() {
    return !!document.msFullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.isFullScreen || document.fullscreen;
  };

  this.compactFullArray = function(e) {
    var a, value;
    a = 0;
    while (a < e.length) {
      value = e[a];
      if (value === "" || value === null || value === undefined) {
        e.splice(a, 1);
        a--;
      }
      a++;
    }
    return e;
  };

  this.idUnico = function(options) {
    var codigo, opt;
    opt = {
      prefixo: "item_"
    };
    if (options) {
      $.extend(opt, options);
    }
    codigo = opt.prefixo + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17);
    return codigo.replace(/\./g, "");
  };

  this.guid = function() {
    var s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join('-');
  };

  this.guidInt = function() {
    return (new Date()).getTime();
  };

}).call(this);