Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}
console.log(Function.__proto__ === Function.prototype)    // true
/**
 * Function.method调用的是Function.prototype.method方法
 * Cat instanceof Function                                // true    Cat是Function的实例
 * Cat.__proto__ === Function.prototype                   // true    Cat.inherits()方法调用的实际上是Function.prototype.inherits的方法
 * cat instanceof Cat                                     // true    cat是Cat的实例
 * cat.__proto__ ==== Cat.prototype                       // true
 */

Function.method('inherits', function (Parent) {
  this.prototype = new Parent();
  return this;
})
// 上面一段代码实际执行的是
// Function.prototype.inherits = function(Parent) {
//   this.prototype = new Parent();
//   return this;
// }

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
console.log(cat.get_name())
