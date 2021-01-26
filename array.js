(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };

  this.Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

  this.Array.prototype.first = function() {
    return this[0];
  };

  this.Array.prototype.last = function() {
    return this.slice(-1)[0];
  };

  this.Array.prototype.clone = function() {
    return this.slice(0);
  };

  Array.prototype.equals = function(array) {
    var list;
    list = (array || []).slice(0).sort();
    return this.length === list.length && this.sort().every(function(el, i) {
      var item;
      item = list[i];
      if (isObject(el)) {
        return Object.equals(el, item);
      } else if (isArray(el)) {
        return el.equals(item);
      } else {
        return el === item;
      }
    });
  };

  this.Array.prototype.groupBy = function(key) {
    return this.reduce(function(obj, item) {
      (obj[item[key]] = obj[item[key]] || []).push(item);
      return obj;
    }, {});
  };

  this.Array.prototype.intersection = function(array) {
    var resp;
    resp = this.filter(function(n) {
      return array.indexOf(n) !== -1;
    });
    return resp.unique();
  };

  Array.prototype.subtract = function(array) {
    return this.filter(function(i) {
      return array.indexOf(i) < 0;
    });
  };

  this.Array.prototype.toggle = function(value) {
    var array, index;
    array = this;
    index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  };

  this.Array.prototype.inArray = function(e) {
    return __indexOf.call(this, e) >= 0;
  };

  this.Array.prototype.mapObj = function(field) {
    return this.map(function(e) {
      return e[field];
    });
  };

  this.Array.prototype.contains = function(e) {
    return __indexOf.call(this, e) >= 0;
  };

  this.Array.prototype.include = function(e) {
    return this.inArray(e);
  };

  this.Array.prototype.includes = this.Array.prototype.include;

  this.Array.prototype.isIncluded = this.Array.prototype.include;

  this.Array.prototype.one = function() {
    return this.length === 1;
  };

  this.Array.prototype.any = function() {
    return this.length > 0;
  };

  this.Array.prototype.many = function() {
    return this.length > 1;
  };

  this.Array.prototype.empty = function() {
    return !this.any();
  };

  this.Array.prototype.index = function(value, field) {
    return this.transform(field).indexOf(value);
  };

  this.Array.prototype.transform = function(field, clone) {
    if (clone == null) {
      clone = false;
    }
    if (field != null) {
      return this.map(function(e) {
        return e[field];
      });
    } else if (clone) {
      return this.clone();
    } else {
      return this;
    }
  };

  this.Array.prototype.sortByField = function(field, type) {
    if (type == null) {
      type = 'asc';
    }
    return this.slice(0).sort(function(a, b) {
      switch (type) {
        case 'asc':
          if (a[field] > b[field]) {
            return 1;
          } else if (a[field] < b[field]) {
            return -1;
          } else {
            return 0;
          }
          break;
        case 'desc':
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
      }
    });
  };

  this.Array.prototype.indexOfById = function(id, opt) {
    var el, idx, key, _i, _len;
    if (opt == null) {
      opt = {};
    }
    key = opt.key || 'id';
    for (idx = _i = 0, _len = this.length; _i < _len; idx = ++_i) {
      el = this[idx];
      if (el[key] === id) {
        return idx;
      }
    }
    return -1;
  };

  this.Array.prototype.getById = function(arg) {
    var _id;
    if (arg instanceof Array) {
      return arg.map((function(_this) {
        return function(_id) {
          return _this.getById(_id);
        };
      })(this));
    } else {
      _id = (arg != null ? arg.id : void 0) || arg;
      return this[this.indexOfById(_id)];
    }
  };

  this.Array.prototype.findById = this.Array.prototype.getById;

  this.Array.prototype.move = function(from, to) {
    return this.splice(to, 0, this.splice(from, 1)[0]);
  };

  this.Array.prototype.remove = function(el) {
    var idx;
    idx = this.indexOf(el);
    if (idx > -1) {
      return this.splice(idx, 1);
    }
  };

  this.Array.prototype.removeByIndex = function(idx) {
    if (idx > -1) {
      return this.splice(idx, 1);
    }
  };

  this.Array.prototype.removeAll = function(el) {
    var _results;
    _results = [];
    while (__indexOf.call(this, el) >= 0) {
      _results.push(this.remove(el));
    }
    return _results;
  };

  this.Array.prototype.removeById = function(rec) {
    var id;
    id = (rec != null ? rec.id : void 0) || rec;
    return this.removeByField('id', id);
  };

  this.Array.prototype.getByField = function(field, value) {
    var idx;
    idx = this.getIndexByField(field, value);
    return this[idx];
  };

  this.Array.prototype.findByKey = this.Array.prototype.getByField;

  this.Array.prototype.findByField = this.Array.prototype.getByField;

  this.Array.prototype.getIndexByField = function(field, value) {
    var el, i, idx, _i, _len;
    if (field === void 0) {
      field = 'id';
    }
    idx = null;
    for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
      el = this[i];
      if (el[field] === value) {
        idx = i;
      }
    }
    return idx;
  };

  this.Array.prototype.removeByField = function(field, value) {
    var el, i, idx, _i, _len, _results;
    if (field === void 0) {
      field = 'id';
    }
    idx = [];
    for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
      el = this[i];
      if (el[field] === value) {
        idx.push(i);
      }
    }
    _results = [];
    while (idx.length > 0) {
      _results.push((this.splice(idx.pop(), 1))[0]);
    }
    return _results;
  };

  this.Array.prototype.extractFrom = function(deepObject) {
    var _attr, _carry, _i, _len;
    _carry = deepObject;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      _attr = this[_i];
      _carry = _carry != null ? _carry[_attr] : void 0;
    }
    return _carry;
  };

  this.Array.prototype.addOrExtend = function(obj, opts) {
    var idx, key;
    if (opts == null) {
      opts = {};
    }
    key = opts.key || 'id';
    idx = obj[key] != null ? this.indexOfById(obj[key], {
      key: key
    }) : this.indexOf(obj);
    if (idx === -1) {
      if (opts.unshift) {
        return this.unshift(obj);
      }
      return this.push(obj);
    } else {
      return angular.extend(this[idx], obj);
    }
  };

  this.Array.prototype.pushOrExtend = function(obj) {
    return this.addOrExtend(obj);
  };

  this.Array.prototype.unshiftOrExtend = function(obj) {
    return this.addOrExtend(obj, {
      unshift: true
    });
  };

  this.Array.prototype.somar = function(field) {
    var _arr;
    _arr = field ? this.map(function(e) {
      return e[field];
    }) : this;
    return _arr.reduce(function(mem, el) {
      return +mem + +el;
    });
  };

  this.Array.prototype.chunk = function(size) {
    var e, i, _i, _len, _results;
    if (size == null) {
      size = 2;
    }
    _results = [];
    for ((size > 0 ? (i = _i = 0, _len = this.length) : i = _i = this.length - 1); size > 0 ? _i < _len : _i >= 0; i = _i += size) {
      e = this[i];
      _results.push(this.slice(i, i + size));
    }
    return _results;
  };

  this.Array.prototype.compact = function() {
    return this.filter(function(e) {
      return !!e || e === 0;
    });
  };

  this.Array.prototype.unique = function(field) {
    var added;
    added = [];
    return this.filter(function(item) {
      var v;
      v = field != null ? item[field] : item;
      if (__indexOf.call(added, v) < 0) {
        return added.push(v);
      }
    });
  };

  this.Array.prototype.diff = function(list) {
    var result;
    result = this.map(function(item) {
      if (!list.includes(item)) {
        return item;
      }
    });
    result.removeAll(void 0);
    return result;
  };

  this.Array.prototype.diffByFn = function(list, fn) {
    var result;
    result = this.map(function(item) {
      if (fn(item, list)) {
        return item;
      }
    });
    result.removeAll(void 0);
    return result;
  };

  this.Array.prototype.diffByField = function(list, field) {
    return this.diffByFn(list, function(el) {
      return list.indexOfById(el[field], {
        key: field
      }) < 0;
    });
  };

  this.Array.prototype.diffById = function(list) {
    return this.diffByField(list, 'id');
  };

  this.Array.prototype.clear = function() {
    this.length = 0;
    return this;
  };

  this.Array.prototype.sum = function() {
    if (!this.length) {
      return 0;
    }
    return this.reduce(function(mem, el) {
      return +mem + +el;
    });
  };

  this.Array.prototype.find = function(fn) {
    return this.select(fn)[0];
  };

  this.Array.prototype.select = function(fn) {
    var el, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      if (!!fn(el)) {
        _results.push(el);
      }
    }
    return _results;
  };

  this.Array.prototype.selectByField = function(key, val) {
    var valIsArray;
    valIsArray = isArray(val);
    return this.select(function(el) {
      var valElIsArray;
      valElIsArray = isArray(el[key]);
      if (valIsArray && valElIsArray) {
        return val.intersection(el[key]).any();
      }
      if (valIsArray) {
        return val.includes(el[key]);
      }
      if (valElIsArray) {
        return el[key].includes(val);
      }
      return el[key] === val;
    });
  };

  this.Array.prototype.reject = function(fn) {
    var el, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      if (!fn(el)) {
        _results.push(el);
      }
    }
    return _results;
  };

  this.Array.prototype.rejectByField = function(key, val) {
    var valIsArray;
    valIsArray = isArray(val);
    return this.select(function(el) {
      var valElIsArray;
      valElIsArray = isArray(el[key]);
      if (valIsArray && valElIsArray) {
        return !val.intersection(el[key]).any();
      }
      if (valIsArray) {
        return !val.includes(el[key]);
      }
      if (valElIsArray) {
        return !el[key].includes(val);
      }
      return el[key] !== val;
    });
  };

  Array.prototype.flattenCompact = function() {
    return this.flatten().compact();
  };

  Array.prototype.flatten = function() {
    return this.reduce((function(flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? toFlatten.flatten() : toFlatten);
    }), []);
  };

  this.Array.prototype.presence = function() {
    if (this.empty()) {
      return null;
    } else {
      return this;
    }
  };

  this.Array.prototype.toSentence = function() {
    if (this.empty()) {
      return '';
    }
    if (this.length === 1) {
      return this.first();
    }
    return [this.slice(0, -1).join(', '), this.last()].join(' e ');
  };

  this.Array.prototype.occurrencesOf = function(e) {
    var el;
    return ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        el = this[_i];
        if (el === e) {
          _results.push(el);
        }
      }
      return _results;
    }).call(this)).length;
  };

  this.Array.prototype.forEach = function(fn) {
    var el, idx, _i, _len, _results;
    if (typeof e !== "function") {
      throw new TypeError;
    }
    _results = [];
    for (idx = _i = 0, _len = this.length; _i < _len; idx = ++_i) {
      el = this[idx];
      _results.push(fn(el, idx, this));
    }
    return _results;
  };

}).call(this);
