(function() {
  angular.module("sc.commons.factories.toggle", []).factory('scToggle', [
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

}).call(this);