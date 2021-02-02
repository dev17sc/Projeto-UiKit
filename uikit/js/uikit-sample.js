(function() {

  this.scModal = {
    body: $('body'),
    "new": function(elemento, opts) {
      if (opts == null) {
        opts = {};
      }
      this.box = $(elemento);
      this.boxBody = $(elemento + " .sc-modal");
      this.onOpen = opts.onOpen;
      this.onClose = opts.onClose;
      return $.extend({}, this);
    },
    open: function() {
      this.box.show(0, (function(_this) {
        return function() {
          _this.box.addClass('active');
          _this.boxBody.addClass('active');
          _this.body.css('overflow', 'hidden');
          if (typeof informNativeAppModaIsOpened === "function") {
            informNativeAppModaIsOpened(true);
          }
          return typeof _this.onOpen === "function" ? _this.onOpen() : void 0;
        };
      })(this));
    },
    close: function() {
      this.box.removeClass('active');
      this.boxBody.removeClass('active');
      this.body.css('overflow', 'auto');
      setTimeout(((function(_this) {
        return function() {
          return _this.box.hide();
        };
      })(this)), 250);
      if (typeof informNativeAppModaIsOpened === "function") {
        informNativeAppModaIsOpened(false);
      }
      if (typeof this.onClose === "function") {
        this.onClose();
      }
    }
  };

  this.scAlert = {
    templates: {
      box: "<div class='sc-alert jq-sc-alert'> <div class='sc-alert-box sc-box-shadow-z3'> <div class='sc-alert-close'><i class='sc-badge-hover-red sc-icon-fechar-1 sc-cursor-pointer'></i></div> <h2 class='sc-alert-title'>Alerta!</h2> <div class='sc-alert-messages'></div> <div class='sc-alert-buttons'></div> </div> </div>",
      button: "<a class='sc-btn sc-btn-block-only-xs'></a>",
      message: "<p></p>"
    },
    open: function(opts) {
      var box, btn, btnClose, button, message, msg, target, url, _i, _j, _len, _len1, _ref, _ref1;
      if (opts == null) {
        opts = {};
      }
      $('body').css({
        'overflow': 'hidden'
      });
      box = $(this.templates.box).appendTo($('body'));
      box.find(".sc-alert-title").text(opts.title);
      btnClose = $(box.find(".sc-alert-close"));
      btnClose.on('click', function() {
        $('body').css({
          'overflow': ''
        });
        return $(this).closest('.sc-alert').remove();
      });
      opts.buttons || (opts.buttons = [{}]);
      _ref = opts.buttons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        btn = $(this.templates.button).appendTo(box.find(".sc-alert-buttons"));
        btn.text(button.label || 'OK');
        btn.addClass("sc-btn-" + (button.color || 'gray'));
        if (button.action) {
          btn.data('action', button.action);
        }
        url = button.url || button.href;
        if (url) {
          btn.attr('href', url);
        }
        target = button.target;
        if (target) {
          btn.attr('target', target);
        }
        btn.on('click', function() {
          var action, bt;
          bt = $(this);
          action = bt.data('action');
          if (action) {
            action();
          }
          $('body').css({
            'overflow': ''
          });
          return bt.closest('.sc-alert').remove();
        });
      }
      if (opts.messages) {
        if (typeof opts.messages === "string") {
          opts.messages = [opts.messages];
        }
        _ref1 = opts.messages;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          message = _ref1[_j];
          msg = $(this.templates.message).appendTo(box.find(".sc-alert-messages"));
          msg.html(message);
        }
      }
      setTimeout(((function(_this) {
        return function() {
          return box.addClass("active");
        };
      })(this)), 100);
    },
    _initCloseOnEsc: $('body').keyup(function(e) {
      var boxJqScAlert;
      if (e.which === 27) {
        boxJqScAlert = $('.jq-sc-alert');
        if (boxJqScAlert.length) {
          return boxJqScAlert.remove();
        }
      }
    })
  };

  jQuery(document).ready(function() {
    // this.scNetwork = globalEscopeSeuCondominio.scNetwork;
    // globalEscopeSeuCondominio.jqCheckboxShiftSelect = {
    //   lastChecked: null,
    //   init: function(params) {
    //     var ctrls, itemCheckAll, itemSelector;
    //     if (params == null) {
    //       params = {};
    //     }
    //     itemSelector = params.item;
    //     itemCheckAll = params.checkAll;
    //     if (itemCheckAll) {
    //       $('body').on('click', itemCheckAll, function(e) {
    //         var checked;
    //         checked = $(this).prop('checked');
    //         return $(itemSelector).prop('checked', checked);
    //       });
    //     }
    //     if (itemSelector) {
    //       ctrls = {};
    //       ctrls[itemSelector] = {
    //         lastChecked: null
    //       };
    //       return $('body').on('click', itemSelector, function(e) {
    //         var check, chkboxes, ctrl, end, start;
    //         ctrl = ctrls[itemSelector];
    //         chkboxes = $(itemSelector);
    //         if (!ctrl.lastChecked) {
    //           ctrl.lastChecked = this;
    //           return;
    //         }
    //         if (e.shiftKey) {
    //           start = chkboxes.index(this);
    //           end = chkboxes.index(ctrl.lastChecked);
    //           chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', ctrl.lastChecked.checked);
    //         }
    //         ctrl.lastChecked = this;
    //         if (itemCheckAll) {
    //           check = chkboxes.length === chkboxes.filter(':checked').length;
    //           return $(itemCheckAll).prop('checked', check);
    //         }
    //       });
    //     }
    //   }
    // };
    // globalEscopeSeuCondominio.aoChamarJsDesseController = function(callback) {
    //   var arquivoJsSemExtensao, cssEJs, nomeDoEvento;
    //   cssEJs = $('.load-assinc-js-and-css').data('load-assinc-js-and-css');
    //   if (cssEJs && cssEJs.js) {
    //     arquivoJsSemExtensao = cssEJs.js.replace(/.js|.coffee/g, '');
    //     nomeDoEvento = 'nomeEventoJsDesseController:' + arquivoJsSemExtensao;
    //     $('body').on(nomeDoEvento, function() {
    //       callback();
    //     });
    //   }
    // };
    // placeholderToTooltip('.placeholder-to-tooltip[placeholder]');
    $.ajaxSetup({
      beforeSend: (function(_this) {
        return function(xhr, settings) {
          var device_id, _base;
          showBodyLoading();
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
          xhr.setRequestHeader('SC-XIP', _this.scNetwork.ipClient);
          device_id = currentUrl().getUrlParam("device_id");
          if (device_id && settings.data) {
            if (typeof (_base = settings.data).append === "function") {
              _base.append('device_id', device_id);
            }
          }
          return true;
        };
      })(this),
      complete: function(xhr, status) {
        hideBodyLoading();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {

        if (errorThrown === 'Internal Server Error') {
          $.avisar('500 Internal Server Error (dentro de uma req. assíncrona)', {
            tema: 'erro'
          });
        }
      }
    });
    jQuery.fn.swapPlaceWith = function(to) {
      return this.each(function() {
        var copy_from, copy_to;
        copy_to = $(to).clone(true);
        copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
      });
    };
    jQuery.fn.visible = function() {
      return this.css('visibility', 'visible');
    };
    jQuery.fn.invisible = function() {
      return this.css('visibility', 'hidden');
    };
    jQuery.fn.visibilityToggle = function() {
      return this.css('visibility', function(i, visibility) {
        if (visibility === 'visible') {
          return 'hidden';
        } else {
          return 'visible';
        }
      });
    };
    $.fn.stopLoadingNaoResponsivo = function(opt) {
      this.each(function() {
        var container;
        container = $(this);
        container.find('.loading_app').remove();
        enableBodyLoading();
        container.removeClass('on_loading');
        if (container.hasClass('bot-retangulo')) {
          container.find('.icone_botao').visible();
        }
      });
    };
    $.fn.startLoadingNaoResponsivo = function(opt) {
      if (!opt) {
        opt = {};
      }
      this.each(function() {
        var botao, container, left, length, lines, radius, spinConfig, spinner, top, width;
        if (!opt.position) {
          opt.position = 'relative';
        }
        container = $(this);
        lines = void 0;
        length = void 0;
        width = void 0;
        radius = void 0;
        top = void 0;
        left = void 0;
        if (container.hasClass('bot-retangulo')) {
          if (!opt.size) {
            opt.size = 'mini';
          }
          container.find('.icone_botao').invisible();
        }
        if (container.hasClass('head_top')) {
          if (!opt.center) {
            opt.center = true;
          }
          if (!opt.shadow) {
            opt.shadow = true;
          }
        }
        if (opt.size === 'mini') {
          lines = 9;
          length = 4;
          width = 2;
          radius = 1;
        }
        if (opt.size === 'smaller') {
          lines = 9;
          length = 6;
          width = 3;
          radius = 2;
        }
        if (opt.size === 'small') {
          lines = 11;
          length = 8;
          width = 4;
          radius = 5;
        }
        if (opt.size === 'medium') {
          lines = 13;
          length = 12;
          width = 6;
          radius = 10;
        }
        if (opt.size === 'large') {
          lines = 13;
          length = 18;
          width = 9;
          radius = 16;
        }
        if (opt.center === true) {
          left = 'auto';
          top = 'auto';
        }
        if (opt.centerX === true) {
          left = 'auto';
        }
        if (opt.centerY === true) {
          top = 'auto';
        }
        if (!left) {
          left = opt.x || null;
        }
        if (!top) {
          top = opt.y || null;
        }
        spinConfig = {
          position: opt.position,
          lines: lines,
          length: length,
          width: width,
          radius: radius,
          corners: 1,
          rotate: 0,
          color: opt.color || '#FFF',
          speed: 2.2,
          trail: 54,
          shadow: opt.shadow || false,
          hwaccel: false,
          className: 'loading_app' || opt.className,
          zIndex: 2e9,
          left: left,
          top: top
        };
        container.addClass('on_loading');
        botao = container.get(0);
        spinner = new Spinner(spinConfig).spin(botao);
        disableBodyLoading();
      });
    };
    $.fn.prevVisible = function() {
      return this.prevAll(':visible:first');
    };
    $.fn.nextVisible = function() {
      return this.nextAll(':visible:first');
    };
    $.fn.hasVal = function() {
      return this.val().length > 0;
    };
    $.fn.horizontal_center = function() {
      this.css('position', 'absolute');
      this.css('left', ($(window).width() - this.outerWidth()) / 2 + $(window).scrollLeft() + 'px');
      return this;
    };
    $.fn.vertical_center = function() {
      this.css('left', ($(window).width() - this.outerWidth()) / 2 + $(window).scrollLeft() + 'px');
      return this;
    };
    $.fn.extend({
      center: function() {
        return this.each(function() {
          var left, top;
          top = ($(window).height() - $(this).outerHeight()) / 2;
          left = ($(window).width() - $(this).outerWidth()) / 2;
          $(this).css({
            position: 'absolute',
            margin: 0,
            top: (top > 0 ? top : 0) + 'px',
            left: (left > 0 ? left : 0) + 'px'
          });
        });
      }
    });

    /* Limitador de Caracteres */
    $.fn.textLimit = function(limit, callback) {
      var callback;
      if (typeof callback !== 'function') {
        callback = function() {};
      }
      return this.each(function() {
        this.limit = limit;
        this.callback = callback;
        this.onkeydown = this.onkeyup = function(e) {
          var limite;
          var keyCode, limite, qtdAtual, qtdFaltando;
          keyCode = e.keyCode;
          this.reached = this.limit - this.value.length;
          this.reached = this.reached <= 0 ? true : false;
          if (keyCode !== 9 && keyCode !== 18 && keyCode !== 16 && keyCode !== 33 && keyCode !== 34 && keyCode !== 35 && keyCode !== 36 && keyCode !== 37 && keyCode !== 38 && keyCode !== 39 && keyCode !== 40 && keyCode !== 45 && keyCode !== 46) {
            if (this.reached) {
              this.value = this.value.substr(0, this.limit);
            }
          }
          limite = this.limit;
          qtdAtual = this.value.length;
          limite = this.limit;
          qtdFaltando = limite - qtdAtual;
          return this.callback(qtdFaltando, qtdAtual, limite, this.reached);
        };
      });
    };
    $('body').on('click', '.mais_multiplos_filhos', function() {
      var $this, adicionar_em, callback, elemento_novo;
      $this = $(this);
      if (!$this.hasClass('desabilitado')) {
        adicionar_em = $this.data('div_target');
        callback = $this.data('_callback');
        if (!$this.data('_elemento_multiplos_filhos')) {
          $.ajax({
            type: 'POST',
            url: '/js/mais',
            data: {
              'model': $this.data('_model'),
              'locals': $this.data('_locals')
            },
            success: function(data) {
              var elemento_novo;
              data = data.trim();
              $this.data('_elemento_multiplos_filhos', data);
              elemento_novo = $($this.data('_elemento_multiplos_filhos')).appendTo(adicionar_em).css('display', 'none').slideDown('fast');
              $(elemento_novo).brilhar();
              if (callback) {
                eval(callback);
              }
              if ($this.data('focar_prim_campo') === true) {
                focar_primeiro_campo($(adicionar_em + ' > div:last'));
              }
              elemento_novo.trigger('adicionado');
            }
          });
        } else {
          elemento_novo = $($this.data('_elemento_multiplos_filhos')).appendTo(adicionar_em).css('display', 'none').slideDown('fast');
          $(elemento_novo).brilhar();
          if (callback) {
            eval(callback);
          }
          elemento_novo.trigger('adicionado');
        }
        if ($this.data('focar_prim_campo') === true) {
          focar_primeiro_campo($(adicionar_em + ' > div:last'));
        }
      }
      return false;
    });
  });

  (function($) {
    $.fn.presence = function() {
      var $this;
      $this = $(this);
      if ($this.length > 0) {
        return $this;
      } else {
        return null;
      }
    };
    $.fn.overflowingBottom = function() {
      var ax;
      var ax, elemento, elemento_bot, screen_bottom;
      elemento = $(this);
      elemento_bot = elemento.offset().top + elemento.outerHeight();
      screen_bottom = $('html').offset().top * -1 + $(window).height();
      if (elemento_bot > screen_bottom) {
        ax = true;
      } else {
        ax = false;
      }
      return ax;
    };
    $.fn.overflowingTop = function() {
      var ax;
      var ax, elemento, elemento_top, screen_top;
      elemento = $(this);
      elemento_top = elemento.offset().top;
      screen_top = $('html').offset().top * -1;
      if (elemento_top > screen_top) {
        ax = false;
      } else {
        ax = true;
      }
      return ax;
    };
    $.fn.overflowingRight = function() {
      var elemento, elemento_right, resultado, tamanho_tela;
      elemento = $(this);
      tamanho_tela = $(window).width();
      elemento_right = elemento.getRight();
      resultado = void 0;
      if (elemento_right > tamanho_tela) {
        resultado = true;
      } else {
        resultado = false;
      }
      return resultado;
    };
    $.fn.getLeft = function() {
      var elemento;
      elemento = $(this);
      return elemento.offset().left;
    };
    $.fn.getRight = function() {
      var elemento;
      elemento = $(this);
      return elemento.offset().left + elemento.outerWidth();
    };
    $.fn.getTop = function() {
      var elemento;
      elemento = $(this);
      if (elemento.offset().top - elemento.outerHeight() >= 0) {
        return elemento.offset().top + elemento.outerHeight();
      } else {
        return elemento.offset().top;
      }
    };
    $('body').find('ul.menu_dropdown li > a').on('mousedown', function(e) {
      var $this, alvo, dropdown, leftMouseButton;
      $this = $(this);
      dropdown = $this.parents('.dropdown');
      leftMouseButton = isLeftButton(e);
      alvo = dropdown.data('alvo');
      if (leftMouseButton === false) {
        alvo.dropdown('close');
      }
    });
    $.fn.hideTooltip = function() {
      return this.each(function() {
        var alvo, tooltip;
        alvo = $(this);
        tooltip = alvo.data('myTooltip');
        if (tooltip) {
          tooltip.hide();
        }
      });
    };
    $.fn.showTooltip = function(text, opt) {
      var color;
      if (!opt) {
        opt = {};
      }
      color = opt.color || 'black';
      return this.each(function() {
        var tooltip;
        var alvo, height_tooltip, left_alvo, pos_alvo, setaTooltip, textTooltip, tooltip, top_alvo, width;
        alvo = $(this);
        if (alvo.data('myTooltip')) {
          tooltip = alvo.data('myTooltip');
        } else {
          tooltip = $('<span class="tooltip"><span class="tooltip_text"></span><span class="seta_tooltip"></span></span>').appendTo($('body'));
          alvo.data('myTooltip', tooltip);
        }
        if (text && text !== '') {
          textTooltip = tooltip.find('.tooltip_text');
          setaTooltip = tooltip.find('.seta_tooltip');
          textTooltip.css({
            'background-color': color
          });
          setaTooltip.css({
            'border-top-color': color
          });
          pos_alvo = alvo.offset();
          width = alvo.width();
          left_alvo = pos_alvo.left;
          top_alvo = pos_alvo.top;
          textTooltip.text(text);
          height_tooltip = tooltip.height();
          tooltip.css('left', left_alvo);
          tooltip.css('top', top_alvo - (height_tooltip + 5));
          tooltip.stop(true, true).fadeIn(150);
        }
      });
    };
    $.fn.showAndHideAfter = function(seconds) {
      var alvo;
      alvo = $(this);
      alvo.show();
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout((function() {
        alvo.fadeOut(500);
      }), seconds * 1000);
    };
    $.fn.tooltip = function(text, options) {
      var opt, tooltip;
      if (isTouchable() === false) {
        opt = {
          teste: 1
        };
        if (options) {
          $.extend(opt, options);
        }
        tooltip = $('span.tooltip');
        return this.each(function() {
          var alvo, texto;
          alvo = $(this);
          alvo.data('text', text);
          texto = alvo.data('text');
          alvo.addClass('tem_tooltip');
        });
      }
    };
    $('body').on('mouseenter', '.tem_tooltip', function() {
      var alvo, texto;
      alvo = $(this);
      texto = alvo.data('text');
      alvo.showTooltip(texto);
    });
    $('body').on('mouseleave', '.tem_tooltip', function() {
      $(this).hideTooltip();
    });
    $('.has_tooltip, *[data-tooltip]').livequery(function() {
      var $this, is_fancybox, text;
      if (isTouchable() === false) {
        $this = $(this);
        text = $this.attr('title') || $this.attr('tooltip') || $this.data('title') || $this.attr('data-tooltip');
        is_fancybox = $this.hasClass('fancybox_image');
        if ($this.attr('title')) {
          $this.data('title', text);
          $this.attr('data-tooltip', null);
          if (is_fancybox === false) {
            $this.removeAttr('title');
          }
        }
        $this.tooltip(text);
      }
    });
    $('.timeago').livequery(function() {
      $(this).timeago();
      $(this).removeAttr('title');
      $(this).fadeIn('fast');
    });

    /* Outros */
    $.fn.slideFadeHide = function(speed, callback) {
      if (!speed) {
        speed = 500;
      }
      return this.css({
        overflow: 'hidden',
        display: 'block'
      }).animate({
        height: '0px',
        opacity: 0.2
      }, speed, 'swing', function() {
        if (callback) {
          callback();
        }
      }).delay(5000);
    };
    $.fn.capturar_botao_fechar_dialog = function(options) {
      var $this, caixa_dialog;
      $this = $(this);
      caixa_dialog = $this.parents('.ui-dialog');
      return caixa_dialog.find('.ui-dialog-titlebar-close');
    };
    $.fn.equals = function(compareTo) {
      var i;
      if (!compareTo || this.length !== compareTo.length) {
        return false;
      }
      i = 0;
      while (i < this.length) {
        if (this[i] !== compareTo[i]) {
          return false;
        }
        ++i;
      }
      return true;
    };
    $.fn.focar_input = function(options) {
      var $this, opt;
      $this = $(this);
      opt = {
        type: 'text',
        posicao_input: 0
      };
      if (options) {
        $.extend(opt, options);
      }
      $this.find('input[type=' + opt.type + ']:not(.desabilitado)').eq(opt.posicao_input).focus();
    };
    $.fn.mudar_posicao_random = function(options) {
      var $this, opt, pos_left, pos_top, posicao_elemento, random_left, random_top, sinais, sinal_left, sinal_top;
      opt = {
        'intervalo': 35
      };
      if (options) {
        $.extend(opt, options);
      }
      $this = $(this);
      posicao_elemento = $this.offset();
      sinais = [1, -1];
      random_left = Math.floor(Math.random() * opt.intervalo + 1);
      random_top = Math.floor(Math.random() * opt.intervalo + 1);
      sinal_left = sinais[Math.floor(Math.random() * sinais.length)];
      sinal_top = sinais[Math.floor(Math.random() * sinais.length)];
      pos_left = posicao_elemento.left + random_left * sinal_left;
      pos_top = posicao_elemento.top + random_top * sinal_top;
      $this.offset({
        top: pos_top,
        left: pos_left
      });
    };
    $.fn.preencherDatasDeVariosPagamentosIncrementandoMes = function(data, options) {
      var $this, opt;
      opt = {
        'sobreescrever': true
      };
      if (options) {
        $.extend(opt, options);
      }
      $this = $(this);
      $this.each(function(index, ipt) {
        var input;
        input = $(ipt);
        if (input.val() === '' || opt.sobreescrever === true) {
          input.val(arrumar_data_estourada(data)).trigger('change');
        }
        data = incrementar_mes(data);
      });
    };
    $.fn.esperar = function(time, callback) {
      jQuery.fx.step.delay = function() {};
      return this.animate({
        delay: 1
      }, time, callback);
    };
    $.fn.brilhar = function(options) {
      var $this, opt;
      opt = {
        'tempo_animacao': 1,
        'esperar': 0
      };
      if (options) {
        $.extend(opt, options);
      }
      $this = $(this);
      $this.stop(true, true).esperar(opt.esperar * 1000).effect('highlight', {}, opt.tempo_animacao * 1000);
    };
    $.avisar = function(mensagem, options) {
      var opt;
      opt = {
        'tempo': true,
        'tema': false
      };
      if (options) {
        $.extend(opt, options);
      }
      if (opt.tema) {
        $.jGrowl.defaults.theme = opt.tema;
      } else {
        $.jGrowl.defaults.theme = 'default';
      }
      if (opt.tempo === 0) {
        $.jGrowl(mensagem, {
          sticky: true
        });
      } else if (opt.tempo === true) {
        $.jGrowl(mensagem, {
          life: 4 * 1000
        });
      } else {
        $.jGrowl(mensagem, {
          life: opt.tempo * 1000
        });
      }
    };
    $.fn.accordionFino = function(options) {
      var $this, opt;
      $this = $(this);
      opt = {
        'abrir_todos': 'false',
        'clicar': 'true'
      };
      if (options) {
        $.extend(opt, options);
      }
      $this.children().each(function(index) {
        var div_item_acc;
        div_item_acc = $(this);
        div_item_acc.addClass('accordion_gc');
        div_item_acc.children().eq(0).addClass('titulo_acc');
        div_item_acc.children().eq(1).addClass('conteudo');
      });
      if (opt.abrir_todos) {
        $this.find('.conteudo').show();
      } else {
        $this.find('.conteudo').hide();
        $this.find('.accordion_gc:first .conteudo').show();
      }
      if (opt.clicar) {
        $this.find('.titulo_acc').css('cursor', 'pointer');
        $this.find('.titulo_acc').click(function(event) {
          var alvo, conteudo, propagar;
          alvo = $(event.target);
          propagar = !alvo.parents('.sem_propagacao_click').size() > 0;
          if (propagar) {
            conteudo = $(this).parent().find('.conteudo');
            if (conteudo.css('display') !== 'none') {
              conteudo.slideUp('fast');
            } else {
              conteudo.slideDown('fast');
            }
          }
        });
      }
    };
    jQuery.fn.numerico = function(options) {
      var opt;
      opt = {
        'virgula': false,
        'hifen': false
      };
      if (options) {
        $.extend(opt, options);
      }
      return this.each(function() {
        $(this).keydown(function(e) {
          var key;
          key = e.charCode || e.keyCode || 0;
          return key === 13 || key === 8 || key === 9 || key === 46 || key >= 37 && key <= 40 || key >= 48 && key <= 57 || opt.virgula && key === 188 || opt.hifen && (key === 189 || key === 109) || key >= 96 && key <= 105;
        });
      });
    };
    jQuery.fn.desabilitar_campo = function(options) {
      var $this, opt;
      $this = $(this);
      opt = {
        'manter_valor': false,
        'readonly': false
      };
      if (options) {
        $.extend(opt, options);
      }
      if (opt.valor_ini !== void 0) {
        opt.manter_valor = opt.valor_ini;
      }
      $this.datepicker('disable');
      if (opt.manter_valor === false) {
        $this.val('');
      }
      if (opt.readonly) {
        $this.attr('readonly', true);
        $this.attr('disabled', false);
      } else {
        $this.attr('disabled', true);
      }
      $this.addClass('desabilitado');
    };
    jQuery.fn.habilitar_campo = function(options) {
      var $this, opt;
      $this = $(this);
      opt = {
        'teste': 0.5
      };
      if (options) {
        $.extend(opt, options);
      }
      $this.removeAttr('disabled');
      $this.removeAttr('readonly');
      $this.removeClass('desabilitado');
      $this.datepicker('enable');
    };
    jQuery.fn.desabilitar = function(options) {
      var $this, opt;
      $this = $(this);
      opt = {
        'opacity': 0.5
      };
      if (options) {
        $.extend(opt, options);
      }
      $this.animate({
        opacity: opt.opacity
      }, 700, function() {
        $(this).addClass('desabilitado');
      });
    };
    jQuery.fn.habilitar = function(options) {
      var $this, opt;
      $this = $(this);
      opt = {
        'opacity': 1
      };
      if (options) {
        $.extend(opt, options);
      }
      $this.animate({
        opacity: opt.opacity
      }, 350, function() {
        $(this).removeClass('desabilitado');
      });
    };
    jQuery.fn.extend({
      slideRightShow: function() {
        return this.each(function() {
          $(this).show('slide', {
            direction: 'right'
          }, 100);
        });
      },
      slideLeftHide: function() {
        return this.each(function() {
          $(this).hide('slide', {
            direction: 'left'
          }, 100);
        });
      },
      slideRightHide: function() {
        return this.each(function() {
          $(this).hide('slide', {
            direction: 'right'
          }, 100);
        });
      },
      slideLeftShow: function(options) {
        var opt;
        opt = {
          time: 100
        };
        if (options) {
          $.extend(opt, options);
        }
        return this.each(function() {
          $(this).show('slide', {
            direction: 'left'
          }, opt.time);
        });
      }
    });
  })(jQuery);

}).call(this);