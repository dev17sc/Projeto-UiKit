myapp = angular.module("myapp", [])

myapp.run([
  '$rootScope', 'scAlert', 'scTopMessages',
  function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
]);

myapp.controller("TesteCtrl", [
  "$scope", "scAlert", "scTopMessages",
  function(s, scAlert, scTopMessages) {

    s.pessoas = [
      {
        id: 1,
        nome: 'Alice Alcântara',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 2,
        nome: 'Ana Claudia',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 3,
        nome: 'Camila Andrade',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 4,
        nome: 'Carla Inácio',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 5,
        nome: 'Cristiane Silva',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 6,
        nome: 'Daniela Santos',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 7,
        nome: 'Eduarda Lourenzzo',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 8,
        nome: 'Erika Albuquerque',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 9,
        nome: 'Ingrid Lopez',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 10,
        nome: 'Ketlyn Alves',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 11,
        nome: 'Lara Gomes',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 12,
        nome: 'Lorena Santos',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 13,
        nome: 'Marco Aurélio F. S. Fonseca',
        cpf: 'xxx.xxx.xxx-xx',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 15,
        nome: 'Pétala Vasconselos',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
      {
        id: 16,
        nome: 'Rita Estela',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date('28/03/2001'),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: 'Rua x, Nº xxx, Setor x',
      },
    ];

    s.formCtrl = {
      show: false,

      init: function () {
        this.show = true;
      },

      close: function() {
        this.show = false;
      },
    };
  }
]);

myapp.controller("FormCtrl", [
  "$scope", "scAlert", "scTopMessages",
  function(s, scAlert, scTopMessages) {



    s.formCtrl = {
      show: false,
      params: {},

      init: function (params) {
        this.params = angular.copy(params);

        this.show = true;
      },

      close: function() {
        this.show = false;

        this.params = {};
      },
    };


    s.endFormCtrl = {
      add: function () {
        s.formCtrl.params.enderecoes ||= [];
        s.formCtrl.params.enderecoes.push({});
      },

      rmv: function (endereco) {
        s.formCtrl.params.enderecoes ||= [];
        s.formCtrl.params.enderecoes.remove(endereco);
      }
    };

    s.contBanCtrl = {
      add: function () {
        s.formCtrl.params.contBan ||= [];
        s.formCtrl.params.contBan.push({});
      },

      rmv: function (contaBancaria) {
        s.formCtrl.params.contBan ||= [];
        s.formCtrl.params.contBan.remove(contaBancaria);
      }
    };
  }
]);

myapp.service('scAlert', [
  'scToggle', '$timeout',
  function(toggler, $timeout) {
    var body, data, defaultOptions, keyBind;
    body = angular.element('body');
    defaultOptions = {
      title: 'Alerta!',
      messages: '',
      buttons: {
        label: 'OK',
        color: 'gray'
      }
    };
    keyBind = function(event) {
      var btn, btns, idx, keyCode, _i, _j, _len, _len1;
      keyCode = event.which || event.keyCode;
      if (keyCode === keyMap.ESC && data.closeOnEsc) {
        data.close();
      }
      if (keyCode === keyMap.ARROW.RIGHT) {
        btns = angular.element('.sc-alert-button-focus');
        for (idx = _i = 0, _len = btns.length; _i < _len; idx = ++_i) {
          btn = btns[idx];
          if (btn === document.activeElement && btns[idx + 1]) {
            btns[idx + 1].focus();
            return;
          }
        }
        btns[0].focus();
      }
      if (keyCode === keyMap.ARROW.LEFT) {
        btns = angular.element('.sc-alert-button-focus');
        for (idx = _j = 0, _len1 = btns.length; _j < _len1; idx = ++_j) {
          btn = btns[idx];
          if (btn === document.activeElement && btns[idx - 1]) {
            btns[idx - 1].focus();
            return;
          }
        }
        return btns[btns.length - 1].focus();
      }
    };
    data = {
      title: void 0,
      messages: [],
      messagesAlign: void 0,
      inputs: [],
      buttons: [],
      onClose: void 0,
      danger: false,
      dangerAudio: false,
      warning: false,
      audioSrc: void 0,
      toggler: new toggler(),
      btnAction: function(btn) {
        if (btn == null) {
          btn = {};
        }
        if (btn.action && this.inputs.any()) {
          if (!this.inputsValidos()) {
            return;
          }
        }
        if (btn.closeOnAction !== false) {
          this.close(true);
        }
        return typeof btn.action === "function" ? btn.action({
          inputs: this.getParams()
        }) : void 0;
      },
      inputsValidos: function() {
        var error, inp, _i, _len, _ref;
        error = true;
        _ref = this.inputs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inp = _ref[_i];
          if (inp.required && !inp.value) {
            error = false;
            inp.error = true;
          }
        }
        return error;
      },
      getParams: function() {
        var inp, params, _i, _len, _ref;
        params = {};
        _ref = this.inputs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          inp = _ref[_i];
          if (inp.type === 'datepicker') {
            params.fim = inp.fim;
            params.inicio = inp.inicio;
          } else {
            params[inp.key] = inp.value;
          }
        }
        return params;
      },
      open: function(opts) {
        var bt, btnIdx, _i, _len, _ref;
        if (opts == null) {
          opts = {};
        }
        opts = angular.extend({}, defaultOptions, opts);
        this.title = opts.title;
        this.messages = [opts.messages].flatten().compact();
        this.messagesAlign = opts.messagesAlign || 'center';
        this.inputs = [opts.inputs].flattenCompact();
        this.buttons = [opts.buttons].flatten().compact();
        this.closeOnEsc = opts.closeOnEsc;
        this.hideCloseButton = opts.hideCloseButton;
        this.onClose = opts.onClose;
        this.danger = !!opts.danger;
        this.dangerAudio = !!opts.dangerAudio;
        this.warning = !!opts.warning;
        this.audioSrc = opts.audioSrc;
        btnIdx = 0;
        _ref = this.buttons;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bt = _ref[_i];
          if (bt.focus) {
            btnIdx = this.buttons.indexOf(bt);
          }
        }
        if (this.closeOnEsc === void 0 && !this.hideCloseButton) {
          this.closeOnEsc = true;
        }
        this.permitirElementosForaDoAlerta || (this.permitirElementosForaDoAlerta = this.inputs.selectByField('type', 'datepicker').any());
        $timeout(function() {
          var btn;
          body.css('overflow', 'hidden');
          body.bind('keydown', keyBind);
          btn = angular.element('.sc-alert-button-focus')[btnIdx];
          if (btn != null) {
            return btn.focus();
          }
        }, 100);
        if (this.audio) {
          this.audio.pause();
          this.audio = void 0;
        }
        if (this.dangerAudio || this.audioSrc) {
          this.audio = new Audio();
          this.audio.src = this.audioSrc || '/audios/efeitos_sonoros/sc-alert-danger.mp3';
          this.audio.loop = true;
          this.audio.play();
        }
        return this.toggler.open();
      },
      close: function(onBtnAction) {
        if (onBtnAction == null) {
          onBtnAction = false;
        }
        if (this.audio) {
          this.audio.pause();
          this.audio = void 0;
        }
        this.toggler.close();
        if (!onBtnAction) {
          if (typeof this.onClose === "function") {
            this.onClose();
          }
        }
        return $timeout(function() {
          body.css('overflow', 'auto');
          return body.unbind('keydown', keyBind);
        });
      }
    };
    return data;
  }
]);

myapp.service("scTopMessages", [
  'scToggle', '$timeout',
  function($toggler, $timeout) {
    var backgrounds, data, defaultOptions, knownThemes;
    defaultOptions = {
      theme: 'danger',
      timeOut: void 0,
      delay: 0
    };
    backgrounds = {
      'warning': 'sc-bg-yellow-dark',
      'success': 'sc-bg-green',
      'danger': 'sc-bg-red',
      'info': 'sc-bg-cian'
    };
    knownThemes = Object.keys(backgrounds);
    data = {
      toggler: new $toggler({
        beforeOpen: function() {
          var tmp;
          tmp = data.theme;
          delete data.theme;
          return $timeout((function() {
            return data.theme = tmp;
          }), 0);
        },
        onClose: function() {
          delete data.theme;
          return delete data.messages;
        }
      }),
      messages: [],
      theme: void 0,
      openDanger: function(messages, opts) {
        if (opts == null) {
          opts = {};
        }
        return this.open(messages, angular.extend(opts, {
          theme: 'danger'
        }));
      },
      openSuccess: function(messages, opts) {
        if (opts == null) {
          opts = {};
        }
        return this.open(messages, angular.extend(opts, {
          theme: 'success'
        }));
      },
      openInfo: function(messages, opts) {
        if (opts == null) {
          opts = {};
        }
        return this.open(messages, angular.extend(opts, {
          theme: 'info'
        }));
      },
      openWarning: function(messages, opts) {
        if (opts == null) {
          opts = {};
        }
        return this.open(messages, angular.extend(opts, {
          theme: 'warning'
        }));
      },
      close: function() {
        this.toggler.close();
        if (this.promessaFechar) {
          return $timeout.cancel(this.promessaFechar);
        }
      },
      open: function(messages, opts) {
        var _ref;
        if (messages == null) {
          messages = [];
        }
        if (opts == null) {
          opts = {};
        }
        this.close();
        messages = [messages].flatten().compact();
        if (messages.empty()) {
          return;
        }
        opts = angular.extend({}, defaultOptions, opts);
        if (_ref = opts.theme, __indexOf.call(knownThemes, _ref) < 0) {
          opts.theme = defaultOptions.theme;
        }
        if (opts.color) {
          opts.theme = (function() {
            switch (opts.color) {
              case 'yellow':
                return 'warning';
              case 'green':
                return 'success';
              case 'red':
                return 'danger';
              case 'cian':
                return 'info';
            }
          })();
        }
        $timeout((function(_this) {
          return function() {
            _this.theme = backgrounds[opts.theme];
            _this.messages = messages;
            return _this.toggler.open();
          };
        })(this), opts.delay);
        if (this.promessaFechar) {
          $timeout.cancel(this.promessaFechar);
        }
        opts.timeOut || (opts.timeOut = opts.timeout);
        if (opts.timeOut != null) {
          return this.promessaFechar = $timeout((function(_this) {
            return function() {
              return _this.toggler.close();
            };
          })(this), opts.delay + opts.timeOut);
        }
      }
    };
    return data;
  }
]);

myapp.factory('scToggle', [
  function() {
    return (function() {
      function _Class(options) {
        if (options == null) {
          options = {};
        }
        this.opened = options.opened, this.beforeClose = options.beforeClose, this.beforeOpen = options.beforeOpen, this.onClose = options.onClose, this.onOpen = options.onOpen;
        this.opened = !!this.opened;
        this.closed = !this.opened;
        this.normalize();
        this.beforeClose || (this.beforeClose = angular.noop);
        this.beforeOpen || (this.beforeOpen = angular.noop);
        this.onClose || (this.onClose = angular.noop);
        this.onOpen || (this.onOpen = angular.noop);
      }

      _Class.prototype.normalize = function() {
        this.isOn = this.active = this.enabled = this.opened;
        return this.isOff = this.inative = this.disabled = this.closed;
      };

      _Class.prototype.open = function() {
        var _ref;
        this.beforeOpen.apply(this, arguments);
        if (this.opened) {
          return;
        }
        _ref = [false, true], this.closed = _ref[0], this.opened = _ref[1];
        this.normalize();
        return this.onOpen.apply(this, arguments);
      };

      _Class.prototype.close = function() {
        var _ref;
        this.beforeClose.apply(this, arguments);
        if (this.closed) {
          return;
        }
        _ref = [true, false], this.closed = _ref[0], this.opened = _ref[1];
        this.normalize();
        return this.onClose.apply(this, arguments);
      };

      _Class.prototype.toggle = function() {
        if (this.closed) {
          return this.open.apply(this, arguments);
        } else {
          return this.close.apply(this, arguments);
        }
      };

      return _Class;

    })();
  }
]);
