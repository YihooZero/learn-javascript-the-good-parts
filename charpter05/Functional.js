Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}

var mammal = function (spec) {
  var that = {};
  that.get_name = function () {
    return spec.name;
  };
  that.says = function () {
    return spec.saying || '';
  };
  return that;
};
var myMammal = mammal({ name: 'Herb' })
console.log(myMammal.get_name());
console.log(myMammal.says());

var cat = function (spec) {
  spec.saying = spec.saying || 'meow';
  var that = mammal(spec);
  that.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i++) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };
  that.get_name = function () {
    return that.says() + ' ' + spec.name + ' ' + that.says();
  };
  return that;
};
const obj = {
  name: 'Bix',
  saying: 'meow',
  says: (function mammal() {}),
  purr: (function cat() {}),
  get_name: (function cat() {}),
}

var myCat = cat({ name: 'Henrietta' });
console.log(myCat.get_name())

Object.method('superior', function (name) {
  var that = this,
    method = that[name];
  return function () {
    return method.apply(that, arguments);
  }
});

var coolcat = function (spec) {
  var that = cat(spec),
    super_get_name = that.superior('get_name');
  that.get_name = function () {
    return 'like ' + super_get_name() + ' baby';
  };
  return that;
};
var myCoolCat = coolcat({ name: 'Bix' });
var name = myCoolCat.get_name();
console.log(name);