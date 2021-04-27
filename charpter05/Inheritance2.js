Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}

Function.method('inherits', function (Parent) {
  console.log(this === Cat)
  this.prototype = new Parent();
  return this;
})

var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function () {
  return this.name;
};

Mammal.prototype.says = function () {
  return this.saying || '';
};

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
}
  .inherits(Mammal)
  .method('purr', function (n) {
    var i, s = '';
    for (i = 0; i < n; i++) {
      if (s) {
        s += '-'
      }
      s += 'r'
    }
    return s;
  })
  .method('get_name', function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
  });

var cat = new Cat('Yihoo');
console.log(cat)
