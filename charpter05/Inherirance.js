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