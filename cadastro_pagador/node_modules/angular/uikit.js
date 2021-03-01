(function() {
  Array.prototype.shuffle = function() {
    var copy_of_this, idx, _shuffle;
    copy_of_this = [].concat(this);
    _shuffle = new Array();
    while (copy_of_this.length) {
      idx = parseInt(Math.random() * copy_of_this.length);
      _shuffle = _shuffle.concat(copy_of_this.splice(idx, 1));
    }
    return _shuffle;
  };

  this.uikitApp = angular.module('uikit-sample', ['sc.commons.components.scMaskFormatService', 'sc.commons.components.scMask', 'sc.commons.components.numberInputFormatService', 'sc.commons.components.currencyInput', 'sc.commons.components.decimalInput', 'sc.commons.components.monthPicker', 'sc.commons.components.datePicker', 'sc.commons.directives.dateInput', 'sc.app.config', 'sc.commons.directives.dropdown', 'sc.commons.directives.scStopClick', 'sc.commons.directives.modal', 'sc.commons.directives.multiCheck', 'sc.commons.factories.toggle', 'sc.commons.filters.nl2br', 'sc.commons.scTopMessages', 'sc.commons.service.scAlert', 'sc.animations', 'sc.timezone']).config([
    'ENV', '$sceDelegateProvider', '$locationProvider', function(ENV, $sceDelegateProvider, $locationProvider) {
      var appConfig;
      appConfig = ENV['<%= Rails.env %>'];
      $sceDelegateProvider.resourceUrlWhitelist(appConfig.cdn.whitelist);
      return $locationProvider.html5Mode(true);
    }
  ]).run([
    '$rootScope', 'scAlert', 'scTopMessages', function($rootScope, scAlert, scTopMessages) {
      var color, fixedColors, primaryColors, scColors, _i, _j, _len, _len1, _ref;
      $rootScope.dynamicColors = ["gray", "blue", "cian", "green", "red", "yellow"];
      $rootScope.scAlert = scAlert;
      $rootScope.scTopMessages = scTopMessages;
      fixedColors = ["white", "black"];
      scColors = [];
      primaryColors = [];
      _ref = $rootScope.dynamicColors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color = _ref[_i];
        scColors.push(color + "-lighter");
        scColors.push(color + "-light");
        scColors.push(color);
        scColors.push(color + "-dark");
        scColors.push(color + "-darker");
        primaryColors.push(color);
      }
      for (_j = 0, _len1 = fixedColors.length; _j < _len1; _j++) {
        color = fixedColors[_j];
        scColors.push(color);
        primaryColors.push(color);
      }
      $rootScope.corIntensidade = ['-lighter', '-light', '', '-dark', '-darker'];
      $rootScope.scColors = scColors;
      $rootScope.primaryColors = primaryColors;
      $rootScope.scSides = ["t", "b", "l", "r", "h", "v"];
      $rootScope.scSizes = ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];
      $rootScope.breakpoints = ["xs", "sm", "md", "lg"];
      $rootScope.scBorderTypes = ["solid", "dashed", "dotted", "none"];
      return $rootScope.scBorderSizes = ["md", "lg", "xl"];
    }
  ]).controller('Uikit::Ctrl', [
    '$scope', 'scToggle', 'UiKit::Templates', function($scope, toggler, Templates) {
      $scope.menu = new toggler();
      $scope.templates = Templates;
      return $scope.lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lobortis ipsum quis lacus consequat imperdiet. Donec nibh justo, posuere in dignissim sit amet, elementum ut sem. Nunc sit amet enim ac nulla finibus laoreet nec venenatis turpis. Quisque ullamcorper ante ut nisl ornare commodo.';
    }
  ]).controller('Uikit::Samples::Accordion', [
    '$scope', function($scope) {
      $scope.activeColor = "green";
      $scope.setActiveColor = function(color) {
        $scope.activeColor = color;
        console.log($scope.activeColor);
        return console.log($scope.accs);
      };
      return $scope.$watch('activeColor', function(newValue, oldValue) {
        return $scope.accs = [
          {
            "class": "sc-acc-" + newValue + "-lighter"
          }, {
            "class": "sc-acc-" + newValue + "-light"
          }, {
            "class": "sc-acc-" + newValue
          }, {
            "class": "sc-acc-" + newValue + "-dark"
          }, {
            "class": "sc-acc-" + newValue + "-darker"
          }, {
            "class": ""
          }
        ];
      });
    }
  ]).controller('Uikit::Samples::Border', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      $scope.sideSelected = "h";
      $scope.colorSelected = "red";
      $scope.typeSelected = $rootScope.scBorderTypes[0];
      $scope.sizeSelected = $rootScope.scBorderSizes[0];
      return $scope.allSides = true;
    }
  ]).controller('Uikit::Samples::Colors', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      $scope.isDark = function(color) {
        var r;
        r = /(black|-dark)/g;
        return color.match(r) !== null;
      };
      $scope.isLighter = function(color) {
        var r;
        r = /(white|-lighter)/g;
        return color.match(r) !== null;
      };
      return $scope.setActiveColor = function(color) {
        return $scope.activeColor = color;
      };
    }
  ]).controller('Uikit::Samples::Cursor', [
    '$scope', function($scope) {
      return $scope.list = ['pointer', 'not-allowed', 'move', 'wait', 'zoom-in', 'zoom-out', 'grab', 'grabbing', 'copy', 'help', 'no-drop', 'progress'];
    }
  ]).controller('Uikit::Samples::ScStopClick', [
    '$scope', 'scToggle', function($scope, toggler) {
      $scope.outside = new toggler();
      $scope.inside1 = new toggler();
      return $scope.inside2 = new toggler();
    }
  ]).controller('Uikit::Samples::Icons', [
    '$scope', function($scope) {
      return $scope.bagdeIcons = {
        blue: "sc-icon-cadeado-aberto",
        grayDark: "sc-icon-carta-2",
        green: "sc-icon-cafe",
        yellow: "sc-icon-estrela",
        red: "sc-icon-exclamacao-3"
      };
    }
  ]).controller('Uikit::Samples::CurrencyInput', [
    '$scope', function($s) {
      $s.myDecimal = {
        value: 1.0,
        centsLimit: 2,
        allowNegative: false
      };
      return $s.myCurrency = {
        value: -1350.25,
        centsLimit: 2,
        allowNegative: true
      };
    }
  ]).controller('Uikit::Samples::MaskInput', [
    '$scope', function($s) {
      $s.maskTypes = currentLocale.masks;
      $s.maskFromStr = {
        mask: '999.9999',
        value: ''
      };
      return $s.maskFromType = {
        type: 'cpf',
        value: '566035'
      };
    }
  ]).controller('Uikit::Samples::Dropdown', [
    '$scope', function($scope) {
      var getIndex;
      $scope.links = [
        {
          title: 'Action',
          active: false
        }, {
          title: 'Another action',
          active: false
        }, {
          title: 'Something else',
          active: false
        }, {
          title: 'Disabled Action',
          active: false,
          disabled: true
        }, {
          title: 'The last one',
          active: false
        }
      ];
      $scope.setCheck = function(link) {
        if (!link.disabled) {
          return link.active = !link.active;
        }
      };
      $scope.setRadio = function(link) {
        var id, idx, opt, _i, _len, _ref, _results;
        if (!link.disabled) {
          id = getIndex(link);
          _ref = $scope.links;
          _results = [];
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            opt = _ref[idx];
            _results.push(opt.active = id === idx);
          }
          return _results;
        }
      };
      return getIndex = function(link) {
        return $scope.links.indexOf(link);
      };
    }
  ]).controller('Uikit::Samples::Icons', [
    '$scope', function($scope) {
      return $scope.bagdeIcons = {
        blue: "sc-icon-cadeado-aberto",
        cian: "sc-icon-carta-2",
        green: "sc-icon-cafe",
        yellow: "sc-icon-estrela",
        red: "sc-icon-exclamacao-3"
      };
    }
  ]).controller('Uikit::Samples::MultiCheck', [
    "$scope", function($scope) {
      return $scope.multiCheckItens = [{}, {}, {}, {}, {}];
    }
  ]).controller('Uikit::Samples::ProgressBarCtrl', [
    '$scope', function($scope) {
      $scope.kinds = ['active', 'success', 'danger', 'warning'];
      $scope.showPercentage = true;
      $scope.stripeType = 0;
      $scope.valores = {
        simples: {
          active: null,
          danger: null,
          warning: null,
          success: null
        },
        staked: {
          active: null,
          danger: null,
          warning: null,
          success: null
        }
      };
      $scope.randomizeValues = function(kind, limit) {
        var key, l, sum, v, _i, _len, _ref, _results;
        sum = 0;
        _ref = $scope.kinds.shuffle();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          if (limit) {
            l = limit - sum;
            if (l < 0) {
              l = 0;
            }
          } else {
            l = 100;
          }
          v = parseInt(Math.random() * l);
          sum += v;
          _results.push(kind[key] = v);
        }
        return _results;
      };
      $scope.randomizeValues($scope.valores.simples);
      return $scope.randomizeValues($scope.valores.staked, 70);
    }
  ]).controller('Uikit::Samples::ScMonthPicker', ['$scope', function($s) {}]).controller('Uikit::Samples::ScDatePicker', [
    '$scope', function($s) {
      $s.datePickerType = 'period';
      return $s.datePicker = {
        start: "",
        finish: scTimezone["new"]().format('YYYY-MM-01')
      };
    }
  ]).controller('Uikit::Samples::ScAlert', [
    '$scope', 'scAlert', 'scTopMessages', function($scope, scAlert, scTopMessages) {
      $scope.alert = function() {
        return scAlert.open({
          title: 'O que é isso?',
          messages: ['Se você acha que isso é um alerta clique em OK!', 'Só existe essa opção, então clica logo :P'],
          buttons: [
            {
              label: 'OK',
              color: 'green'
            }
          ]
        });
      };
      return $scope.confirm = function() {
        return scAlert.open({
          title: 'Você tem certeza?',
          messages: 'Você não será capaz de recuperar esse registro!',
          buttons: [
            {
              label: 'Cancelar',
              color: 'gray'
            }, {
              label: 'Excluír',
              color: 'red',
              action: function() {
                return scTopMessages.openSuccess("Registro excluído com sucesso!", {
                  timeOut: 3000
                });
              }
            }
          ]
        });
      };
    }
  ]).controller('Uikit::Samples::ScModal', [
    "$scope", '$scModal', function($scope, $scModal) {
      $scope.anyModal = new $scModal();
      return $scope.anyModalDraggable = new $scModal();
    }
  ]).controller('Uikit::Samples::ScStopClick', [
    '$scope', 'scToggle', function($scope, toggler) {
      $scope.outside = new toggler();
      $scope.inside1 = new toggler();
      return $scope.inside2 = new toggler();
    }
  ]).controller('Uikit::Samples::SpacingCtrl', [
    '$rootScope', '$scope', function($rootScope, $scope) {
      $scope.tipos = [
        {
          abbrev: 'all',
          label: 'all'
        }, {
          abbrev: 't',
          label: 'top'
        }, {
          abbrev: 'r',
          label: 'right'
        }, {
          abbrev: 'b',
          label: 'bottom'
        }, {
          abbrev: 'l',
          label: 'left'
        }, {
          abbrev: 'v',
          label: 'vertical (top + bottom)'
        }, {
          abbrev: 'h',
          label: 'horizontal (right + left)'
        }
      ];
      $scope.tamanhos = ['none'].concat($rootScope.scSizes);
      return $scope.getClass = function(prefix, tipo, tamanho) {
        var _ret;
        if (tipo.abbrev === 'all') {
          _ret = "sc-" + prefix + "-" + tamanho;
        } else {
          _ret = "sc-" + prefix + "-" + tipo.abbrev + "-" + tamanho;
        }
        if (tamanho === 'none') {
          _ret = "sc-" + prefix + "-xs " + _ret;
        }
        return _ret;
      };
    }
  ]).controller('Uikit::Samples::Shadows', [
    '$scope', function($scope) {
      $scope.color = 'yellow';
      $scope.zValues = [0, 1, 2, 3, 4, 5];
      $scope.count = 0;
      return $scope.addLevel = function() {
        return $scope.count = ($scope.count + 1) % $scope.zValues.length;
      };
    }
  ]).controller('Uikit::Samples::Tags', [
    '$scope', function($scope) {
      return $scope.labels = ["Esportes", "Lazer", "Política", "Novelas", "Saúde", "Educação", "Esportes", "Política", "Novelas", "Saúde", "Esportes", "Lazer"];
    }
  ]).controller('Uikit::Samples::ScTooltip', [
    '$scope', function($s) {
      $s.positions = ['top', 'left', 'bottom', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
      $s.sizes = ['sm', 'md', 'lg'];
      $s.classes = function() {
        var classes;
        classes = [];
        if ($s.useScTooltipPosition) {
          classes.push("sc-tooltip-" + $s.scTooltipPosition);
        }
        if ($s.useScTooltipSize) {
          classes.push("sc-tooltip-" + $s.scTooltipSize);
        }
        if ($s.useScTooltipAlways) {
          classes.push('sc-tooltip-always');
        }
        if ($s.useScTooltipNever) {
          classes.push('sc-tooltip-never');
        }
        return classes.join(' ');
      };
      return $s.conteudo = 'Lorem Ipsum is simply dummy text of the printing.';
    }
  ]);

}).call(this);