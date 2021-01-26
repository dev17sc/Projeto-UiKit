(function() {
  this.currentModulo = {};

  this.RelatorioMassaFiltros = {
    init: function(opt) {
      var _ref, _ref1, _ref2, _ref3;
      if (opt == null) {
        opt = {};
      }
      this.filtros = (typeof currentModulo !== "undefined" && currentModulo !== null ? (_ref = currentModulo.relatorio_massa) != null ? _ref.filtros : void 0 : void 0) || {};
      this.key = opt.key;
      if (!this._isValid()) {
        return;
      }
      this.filtroConfig = (_ref1 = this.filtros) != null ? _ref1[this.key] : void 0;
      this.filtroList = this.filtroConfig.list;
      this.params = {};
      if (!opt.key) {
        alert('Passe a key em relatorioMassaCtrl.init(key: "xxxxxxxxxxx")');
      }
      this._updateList();
      this._escutarSocket();
      this._setLabel();
      this.newRecord = false;
      this.nomeando = false;
      this.renomeando = false;
      this.params.id = ((_ref2 = this.list.findByField('ultimo', true)) != null ? _ref2.id : void 0) || ((_ref3 = this.list[0]) != null ? _ref3.id : void 0);
      if (!this.params.id) {
        this.novoFiltro();
      }
      this.onChange = opt.onChange;
      opt.formParams.relatorio_massa_filtro = this.params;
      this.onChangeCallback();
      return this;
    },
    renomear: function() {
      return this.request('update', {
        params: {
          nome: this.params.nome
        },
        onSuccess: (function(_this) {
          return function(data) {
            return _this.cancelarNome();
          };
        })(this)
      });
    },
    excluir: function() {
      var exec;
      exec = (function(_this) {
        return function() {
          return _this.request('destroy', {
            onSuccess: function(data) {
              var _ref;
              _this.list.removeById(_this.params.id);
              if (_this.list.empty()) {
                _this.novoFiltro();
              }
              if (_this.list.any()) {
                _this.params.id = (_ref = _this.list[0]) != null ? _ref.id : void 0;
              }
              return _this.onChangeCallback();
            }
          });
        };
      })(this);
      return scAlert.open({
        title: 'Excluir?',
        buttons: [
          {
            label: 'Sim',
            color: 'green',
            action: function() {
              return exec();
            }
          }, {
            label: 'Não',
            color: 'red'
          }
        ]
      });
    },
    request: function(type, opt) {
      var params;
      params = {
        request_type: type,
        filtro_id: this.params.id
      };
      if (opt.params) {
        Object.assign(params, opt.params);
      }
      return $.ajax({
        url: (baseUrlController()) + "/relatorio_massa_filtros_request",
        type: 'POST',
        data: params,
        success: (function(_this) {
          return function(data) {
            return opt.onSuccess(data);
          };
        })(this),
        error: (function(_this) {
          return function(req) {
            var messages, _ref;
            messages = (req != null ? (_ref = req.responseJSON) != null ? _ref.messages : void 0 : void 0) || 'Erro ao executar';
            if (messages) {
              return _this._showMessages({
                title: 'Erro',
                messages: messages,
                color: 'red'
              });
            }
          };
        })(this)
      });
    },
    novoFiltro: function() {
      this._setLabel('Novo Filtro');
      this.newRecord = true;
      this.params.nome = this.filtroConfig.nome;
      if (this.list.any()) {
        this.params.nome = this.params.nome + " " + (this.list.length + 1);
      }
      this.params.key = this.key;
      this.lastId = this.params.id;
      delete this.params.id;
      delete this.params.atualizar_args;
      return this.nomeando = true;
    },
    renomearForm: function() {
      var _ref;
      this.params.nome = (_ref = this._selected()) != null ? _ref.nome : void 0;
      this.nomeando = true;
      return this.renomeando = true;
    },
    cancelarNome: function(opt) {
      var _base;
      if (opt == null) {
        opt = {};
      }
      this._setLabel();
      (_base = this.params).id || (_base.id = this.lastId);
      if (this.newRecord) {
        this.onChangeCallback();
      }
      delete this.params.key;
      delete this.params.nome;
      this.newRecord = false;
      this.nomeando = false;
      this.renomeando = false;
      return this.lastId = null;
    },
    reloadArgs: function() {
      return this.onChangeCallback();
    },
    salvarArgs: function() {
      if (this.params.atualizar_args) {
        delete this.params.atualizar_args;
        return;
      }
      return this.params.atualizar_args = true;
    },
    onChangeCallback: function(opt) {
      var filtro;
      if (opt == null) {
        opt = {};
      }
      filtro = opt.filtro || this._selected();
      filtro = Object.clone(filtro);
      return typeof this.onChange === "function" ? this.onChange(filtro) : void 0;
    },
    _isValid: function() {
      var errors;
      errors = [];
      if (isBlank(this.filtros)) {
        errors.push('Necessário cadastrar o modulo em RelatorioMassaFiltro::TIPOS_FILTROS');
        errors.push('Teste no console do Chrome: currentModulo.relatorio_massa.filtros');
      }
      if (Object.any(this.filtros) && !Object.keys(this.filtros).includes(this.key)) {
        errors.push(this.key + " não está presente nos filtros passados nos: currentModulo.relatorio_massa.filtros");
      }
      if (errors.any()) {
        scAlert.open({
          title: 'Relatorio Massa Erro',
          messages: errors,
          buttons: [
            {
              label: 'OK',
              color: 'red'
            }
          ]
        });
      }
      return errors.empty();
    },
    _setLabel: function(label) {
      if (label == null) {
        label = null;
      }
      return this.label = label || 'Filtros Salvos';
    },
    _showMessages: function(opt) {
      if (opt == null) {
        opt = {};
      }
      return scAlert.open({
        title: opt.title,
        messages: opt.messages,
        buttons: [
          {
            label: 'OK',
            color: opt.color
          }
        ]
      });
    },
    _updateList: function(opt) {
      var filtro, list, _ref, _ref1;
      if (opt == null) {
        opt = {};
      }
      list = this.filtroList || [];
      filtro = opt.filtro;
      if (filtro) {
        list.addOrExtend(filtro);
        this.params.id = filtro.id;
        this.onChangeCallback({
          filtro: filtro
        });
        this.filtroList = list;
        this.cancelarNome();
      }
      this.list = list;
      return typeof currentModulo !== "undefined" && currentModulo !== null ? (_ref = currentModulo.relatorio_massa) != null ? (_ref1 = _ref.filtros[this.key]) != null ? _ref1.list = this.list : void 0 : void 0 : void 0;
    },
    _escutarSocket: function() {
      var canal;
      canal = "relatorio-massa-" + (currentCliente().id);
      channelStopListen(canal);
      return channelListen(canal, {
        onJsonData: (function(_this) {
          return function(data) {
            if (data.filtro) {
              _this._updateList({
                filtro: data.filtro
              });
            }
            if (data.errors) {
              return _this._showMessages({
                title: 'Erro ao salvar Relatório em Massa',
                messages: data.errors,
                color: 'red'
              });
            }
          };
        })(this)
      });
    },
    _selected: function() {
      var _ref;
      return (_ref = this.list) != null ? _ref.findByField('id', this.params.id) : void 0;
    }
  };

  this.screenMainCtrl = {
    deviceType: function() {
      if (this.isSize.xs() || this.isSize.sm()) {
        return 'phone';
      }
      if (this.isSize.md()) {
        return 'tablet';
      }
      if (this.isSize.lg()) {
        return 'desktop';
      }
    },
    isSize: {
      xs: function() {
        return window.innerWidth < 480;
      },
      sm: function() {
        var _ref;
        return (479 < (_ref = window.innerWidth) && _ref < 960);
      },
      md: function() {
        var _ref;
        return (959 < (_ref = window.innerWidth) && _ref < 1280);
      },
      lg: function() {
        return 1279 < window.innerWidth;
      }
    }
  };

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

  this.configInputCidade = function(inputCidade) {
    var boxEndereco, cidade, inputName, _ref;
    boxEndereco = inputCidade.closest('.campos_endereco').presence();
    if (!boxEndereco) {
      alert('Erro de desenvolvimento: Os campos de endereço devem estar dentro de uma div com class "campos_endereco" ');
    }
    inputName = "" + (inputCidade.data('input-name'));
    cidade = inputCidade.data('current-value');
    ajustarFormEnderecoPais(boxEndereco, cidade);
    return inputCidade.autocompleteApp({
      onChange: function(cidade) {
        return ajustarFormEnderecoPais(boxEndereco, cidade);
      },
      dataAs: {
        title: 'nome_completo',
        value: 'id'
      },
      className: 'cidade-autocomplete-app',
      placeholder: (typeof commonsLocale !== "undefined" && commonsLocale !== null ? (_ref = commonsLocale.labels) != null ? _ref.cidade : void 0 : void 0) || 'Cidade',
      name: inputName,
      value: cidade,
      minCharLength: 2,
      url: "/support/regions/cities"
    });
  };

  this.ajustarFormEnderecoPais = function(box, cidade) {
    var campo, has, hasConfig, input, inputBox, _ref, _results;
    if (!cidade) {
      return;
    }
    hasConfig = cidade != null ? (_ref = cidade.config) != null ? _ref.has : void 0 : void 0;
    _results = [];
    for (campo in hasConfig) {
      has = hasConfig[campo];
      input = box.find("input." + campo);
      inputBox = input.closest('.label_app').presence() || input.closest('div').presence();
      if (has) {
        _results.push(inputBox.slideDown('fast'));
      } else {
        inputBox.slideUp('fast');
        _results.push(input.val(''));
      }
    }
    return _results;
  };

  this.preencherEndereco = function(container, cep) {
    var $this, valor;
    $this = container;
    valor = cep;
    if (valor.replace(' ', '').match(/^\d{5}\-\d{3}/)) {
      jQuery.data(document.body, 'cep', valor);
      $.getJSON('/support/regions/addresses?cep=' + valor, function(data) {
        var box, comboCidade;
        if (data) {
          box = $this.parents('.campos_endereco');
          box.find('.logradouro').val(data.logradouro).trigger('change');
          box.find('.bairro').val(data.bairro).trigger('change');
          comboCidade = box.find('.cidade-autocomplete');
          if (comboCidade.length > 0) {
            comboCidade.comboAppSetValue(data.cidade);
          }
        }
      });
    }
  };

  this.informNativeAppModaIsOpened = function(boolean) {
    var err;
    try {
      window.webkit.messageHandlers.erpWebViewModalIsOpened.postMessage(boolean);
    } catch (_error) {
      err = _error;
    }
    try {
      return android.erpWebViewModalIsOpened(boolean);
    } catch (_error) {
      err = _error;
    }
  };

  this.informNativeAppUrlChanged = function() {
    var err;
    try {
      window.webkit.messageHandlers.erpWebViewUrlChanged.postMessage(currentPath());
    } catch (_error) {
      err = _error;
    }
    try {
      return android.erpWebViewUrlChanged(currentPath());
    } catch (_error) {
      err = _error;
    }
  };

  this.googleAnalyticsAssinc = function(url) {
    var userId, _ref;
    if (typeof gtag === 'undefined') {
      return;
    }
    url || (url = document.location.pathname);
    gtag('config', 'UA-27009178-1', {
      'page_path': url
    });
    userId = (_ref = currentUser()) != null ? _ref.id : void 0;
    if (userId) {
      return gtag('set', {
        'user_id': userId
      });
    }
  };

  this.montarComboResidencias = function(opt) {
    var combo, combos, onChange, placeholder;
    combos = opt.combo;
    onChange = opt.onChange || function() {};
    placeholder = opt.placeholder || 'Selecione o Apartamento / Casa';
    combo = void 0;
    combos.each(function() {
      var atributos, name, value;
      combo = $(this);
      atributos = combo.attr('data-combo-lares').toJson();
      name = atributos.name;
      value = atributos.value;
      combo.comboApp({
        placeholderTooltip: false,
        placeholder: placeholder,
        value: value,
        name: name,
        onChange: function(currentObj, combo, event) {
          onChange(currentObj, combo, event);
        }
      });
    });
  };

  this.timeago = function(time) {
    return '<time class="timeago" datetime="' + time + '"></time>';
  };

  this.pushHistoryObj = function(historyObj) {
    history.replaceState(historyObj);
  };

  this.nosContrate = function() {
    var urlAbrirForm;
    urlAbrirForm = '/nos_contrate';
    lbox({
      title: 'Entraremos em Contato com Você',
      url: urlAbrirForm,
      beforeSubmit: function(form, submitButton) {
        var email, inputEmail, inputNome, inputTelefone, nome, telefone, validacao;
        inputTelefone = form.find('.telefone');
        inputNome = form.find('.nome');
        inputEmail = form.find('.email');
        telefone = inputTelefone.val();
        email = inputEmail.val();
        nome = inputNome.val();
        validacao = true;
        inputNome.removeClass('erro');
        inputTelefone.removeClass('erro');
        inputEmail.removeClass('erro');
        if (email && email.isValidEmail() === false) {
          inputEmail.addClass('erro');
          validacao = false;
        }
        if (!nome) {
          inputNome.addClass('erro');
          validacao = false;
        }
        if (!telefone && !email) {
          if (!telefone) {
            inputTelefone.addClass('erro');
          }
          if (!email) {
            inputEmail.addClass('erro');
          }
          validacao = false;
        }
        return validacao;
      },
      submitSuccess: function(data, form, submitButton) {
        googleAnalyticsAssinc('/cadastrar_nos_contrate');
        lbox({
          title: 'Muito Obrigado',
          content: '<div class=\'sucesso_nos_contrate\'>Entraremos em Contato com você em no máximo 24hs</div>'
        });
      },
      onClose: function(event) {}
    });
  };

  this.currentHost = function() {
    return document.location.host;
  };

  this.currentPath = function() {
    return window.location.pathname + window.location.search;
  };

  this.currentUrl = function() {
    return document.URL;
  };

  this.carregarLibLoginFacebookEIniciarAPPSEUCONDOMINIO = function() {
    var id, js, ref;
    id = void 0;
    js = void 0;
    ref = void 0;
    js = void 0;
    id = 'facebook-jssdk';
    ref = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) {
      return;
    }
    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/en_US/all.js';
    ref.parentNode.insertBefore(js, ref);
    window.fbAsyncInit = function() {
      return FB.init({
        appId: $('body').attr('data-facebook-app'),
        status: true,
        cookie: true,
        xfbml: true
      });
    };
  };

  this.focar_primeiro_campo = function(div) {
    if (isTouchable() === false) {
      div.find('input[type="text"]:visible').not('.ignore_autofocus, .data, .hora').eq(0).focus();
    }
  };

  this.checkCssLoaded = function(file) {
    var loadedCss;
    loadedCss = $('body').data('loadedCss') || [];
    return in_array(file, loadedCss);
  };

  this.addCssFileToLoadedList = function(file) {
    var loadedCss;
    if (checkCssLoaded(file)) {
      return;
    }
    loadedCss = $('body').data('loadedCss') || [];
    loadedCss.push(file);
    $('body').data('loadedCss', loadedCss);
  };

  this.loadCssAndJs = function(arquivosCSS, arquivosJS, onComplete) {
    var escopoDaFuncao, onAllFilesProcessed;
    enableBodyLoading();
    showBodyLoading();
    escopoDaFuncao = this;
    escopoDaFuncao.loadedJs = false;
    escopoDaFuncao.loadedCss = false;
    escopoDaFuncao.executouOnComplete = false;
    onAllFilesProcessed = function() {
      if (!(escopoDaFuncao.loadedJs && escopoDaFuncao.loadedCss)) {
        return;
      }
      if (escopoDaFuncao.executouOnComplete) {
        return;
      }
      escopoDaFuncao.executouOnComplete = true;
      return setTimeout((function() {
        if (typeof onComplete === "function") {
          onComplete();
        }
        return hideBodyLoading();
      }), 100);
    };
    loadCss(arquivosCSS, function() {
      escopoDaFuncao.loadedCss = true;
      return onAllFilesProcessed();
    });
    return loadJs(arquivosJS, function() {
      escopoDaFuncao.loadedJs = true;
      return onAllFilesProcessed();
    });
  };

  this.loadCss = function(files, onComplete) {
    var allLoaded, file, otherFileWasCheckedOrLoaded, totalFilesCheckedOrLoaded, _i, _len, _results;
    files = [files].flatten().filter(String);
    if (Object.blank(files)) {
      return typeof onComplete === "function" ? onComplete() : void 0;
    }
    allLoaded = void 0;
    totalFilesCheckedOrLoaded = 0;
    otherFileWasCheckedOrLoaded = function() {
      totalFilesCheckedOrLoaded++;
      allLoaded = files.length === totalFilesCheckedOrLoaded;
      if (allLoaded === true) {
        return typeof onComplete === "function" ? onComplete() : void 0;
      }
    };
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      if (checkCssLoaded(file)) {
        otherFileWasCheckedOrLoaded();
        continue;
      }
      addCssFileToLoadedList(file);
      _results.push(yepnope([
        {
          load: file,
          complete: function() {
            return otherFileWasCheckedOrLoaded();
          }
        }
      ]));
    }
    return _results;
  };

  this.dispararEventoJsDesseController = function(arquivoJS) {
    var arquivoSemExtensao, nomeDoEvento, trigger;
    arquivoSemExtensao = arquivoJS.replace(/.js|.coffee/g, '');
    nomeDoEvento = 'nomeEventoJsDesseController:' + arquivoSemExtensao;
    trigger = function() {
      return $('body').trigger(nomeDoEvento);
    };
    if (typeof scPageSystem !== "undefined" && scPageSystem !== null) {
      scPageSystem.updatePageSettingsFromServer(currentUrl(), trigger);
    }
  };

  this.loadJs = function(files, onComplete) {
    files = [files].flatten().filter(String);
    if (Object.blank(files)) {
      return typeof onComplete === "function" ? onComplete() : void 0;
    }
    $script(files, function() {
      return typeof onComplete === "function" ? onComplete() : void 0;
    });
  };

  this.prepareToKeyupSearch = function(opt) {
    var $this, arrowPressed, buscar, delay, e, input, keyDownPressed, keyUpPressed, onSearch, shiftPressed, tabPressed, textBusca;
    e = opt.event;
    input = $(e.target);
    onSearch = opt.onSearch;
    delay = opt.delay || 500;
    $this = input;
    textBusca = input.val();
    keyDownPressed = e.keyCode === 40;
    keyUpPressed = e.keyCode === 38;
    tabPressed = e.keyCode === 9;
    shiftPressed = e.keyCode === 16;
    arrowPressed = keyDownPressed || keyUpPressed || e.keyCode === 37 || e.keyCode === 39;
    buscar = !tabPressed && !shiftPressed && !arrowPressed && $this.lastSearch !== textBusca;
    if (buscar) {
      $this.lastSearch = textBusca;
      clearTimeout(this.contagem_regressiva_busca);
      this.contagem_regressiva_busca = setTimeout((function() {
        onSearch.call();
      }), delay);
    }
  };

  this.placeholderToTooltip = function(selectorString) {
    $('body').on('focus', selectorString, function() {
      var input;
      input = $(this);
      if (input.val()) {
        input.showTooltip(input.attr('placeholder'), {
          color: '#000'
        });
      }
    });
    $('body').on('mouseenter', selectorString, function() {
      var input;
      input = $(this);
      if (input.val()) {
        input.showTooltip(input.attr('placeholder'), {
          color: '#000'
        });
      } else {

      }
    });
    $('body').on('mouseleave', selectorString + ':not(:focus)', function() {
      var input;
      input = $(this);
      if (input.val()) {
        input.hideTooltip();
      } else {

      }
    });
    $('body').on('keyup', selectorString, function() {
      var input;
      input = $(this);
      if (input.val()) {
        input.showTooltip(input.attr('placeholder'), {
          color: '#000'
        });
      } else {
        input.hideTooltip();
      }
    });
    $('body').on('blur', selectorString, function() {
      var input;
      input = $(this);
      input.hideTooltip();
    });
  };

  if (window.addEventListener) {
    window.setTimeout((function() {
      window.addEventListener('popstate', function(event) {
        var data, mes_antigo, mes_novo, url;
        if (typeof event.state === 'object') {
          data = event.state;
          url = void 0;
          if (data) {
            if (data.tipo === 'navegacaoMenuSite') {
              url = data.url;
              if (url) {
                loadSitePage({
                  url: data.url,
                  gerarHistorico: false
                });
              }
            }
            if (data.tipo === 'erpPageSinc') {
              url = data.url;
              if (url) {
                redirectTo(data.url);
              }
            }
            if (data.tipo === 'loadErpPage') {
              url = data.url;
              if (url) {
                loadErpPage({
                  url: data.url,
                  gerarHistorico: false
                });
              }
            }
            if (data.tipo === 'mudarMesDoErp') {
              mes_antigo = data.mes_antigo;
              mes_novo = data.mes_novo;
              if (mes_antigo && mes_novo) {
                mudarMesSistema(mes_antigo, mes_novo, {
                  gerarHistorico: false
                });
              }
            }
          }
        }
      });
    }), 5000);
  }

  this.globalEscopeSeuCondominio = this;

  jQuery(document).ready(function() {
    this.scNetwork = globalEscopeSeuCondominio.scNetwork;
    globalEscopeSeuCondominio.jqCheckboxShiftSelect = {
      lastChecked: null,
      init: function(params) {
        var ctrls, itemCheckAll, itemSelector;
        if (params == null) {
          params = {};
        }
        itemSelector = params.item;
        itemCheckAll = params.checkAll;
        if (itemCheckAll) {
          $('body').on('click', itemCheckAll, function(e) {
            var checked;
            checked = $(this).prop('checked');
            return $(itemSelector).prop('checked', checked);
          });
        }
        if (itemSelector) {
          ctrls = {};
          ctrls[itemSelector] = {
            lastChecked: null
          };
          return $('body').on('click', itemSelector, function(e) {
            var check, chkboxes, ctrl, end, start;
            ctrl = ctrls[itemSelector];
            chkboxes = $(itemSelector);
            if (!ctrl.lastChecked) {
              ctrl.lastChecked = this;
              return;
            }
            if (e.shiftKey) {
              start = chkboxes.index(this);
              end = chkboxes.index(ctrl.lastChecked);
              chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', ctrl.lastChecked.checked);
            }
            ctrl.lastChecked = this;
            if (itemCheckAll) {
              check = chkboxes.length === chkboxes.filter(':checked').length;
              return $(itemCheckAll).prop('checked', check);
            }
          });
        }
      }
    };
    globalEscopeSeuCondominio.aoChamarJsDesseController = function(callback) {
      var arquivoJsSemExtensao, cssEJs, nomeDoEvento;
      cssEJs = $('.load-assinc-js-and-css').data('load-assinc-js-and-css');
      if (cssEJs && cssEJs.js) {
        arquivoJsSemExtensao = cssEJs.js.replace(/.js|.coffee/g, '');
        nomeDoEvento = 'nomeEventoJsDesseController:' + arquivoJsSemExtensao;
        $('body').on(nomeDoEvento, function() {
          callback();
        });
      }
    };
    placeholderToTooltip('.placeholder-to-tooltip[placeholder]');
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