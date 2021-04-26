/*
 *  1、新建一个方法模拟构造函数的new操作符
 */
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}

Function.method('new', function () {
  // 创建一个新对象，它继承自构造器函数的原型对象
  var that = Object.create(this.prototype);
  // 创建一个空对象，其__proto__属性指向this.prototype;
  // that.__proto__ = this.prototype;

  // 调用构造器函数，绑定this到新对象上
  var other = this.apply(that, arguments);

  // 如果它的返回值不是一个对象，就返回该新对象
  return (typeof other === 'object' && other) || that;
})

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  console.log(`I am ${this.name}, ${this.age} years old !`)
}

var person1 = Person.new("Yihoo", 30);
person1.say()  // I am Yihoo, 30 years old !

/*
 *  2、js原生操作符new来操作构造函数
 */
var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function () {
  return this.name;
};

Mammal.prototype.says = function () {
  return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal!');
var name = myMammal.get_name();  // 'Herb the Mammal!'

var Cat =  function (name) {
  this.name = name;
  this.saying = 'meow';
}
Cat.prototype = new Mammal();
Cat.prototype.purr = function (n) {
  var i, s = '';
  for (i = 0; i < n; i++) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
Cat.prototype.get_name = function () {
  return this.says() + ' ' + this.name + ' ' + this.says();
}

var myCat = new Cat('Henrietta');
var says = myCat.says();          // 'meow'
var purr = myCat.purr(5);      // 'r-r-r-r-r'
var name = myCat.get_name();      // 'meow Henrietta meow'
// 以上原型继承图示参考 https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/inheritance1.png

