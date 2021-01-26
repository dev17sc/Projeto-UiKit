// # Exemplo de uso de inputs
//   # scAlert.open
//   #   title: "Preencha as datas dos relatório",
//   #   inputs: [
//   #     { label: 'Início', key: 'inicio', type: 'date', required: true, value: null}
//   #     { label: 'Fim',    key: 'fim',  ' type: 'date', required: true, value: null}
//   #   ]
//   #   buttons: [
//   #     { label: 'Cancelar', color: 'gray'}
//   #     { label: 'Gerar', color: 'green', action: (data) -> console.log(data.inputs) }
//   #   ]
console.log('teswte 3');
(function() {

  console.log('teswte 4');
  angular.module('scAlert', ['sc.commons.factories.toggle'])
    .service('scAlert', [
      'scToggle', '$timeout', function(toggler, $timeout) {
        console.log('oie');
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
    ]
  );

}).call(this);