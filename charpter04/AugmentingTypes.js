Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}
console.log(typeof Number === 'function')                          // true
console.log(Object.getPrototypeOf(Number) === Function.prototype); // true
console.log(Number.__proto__ === Function.prototype)               // true

/*
 * typeof Number === 'function' 说明Number是一个函数方法;
 * 后两行代码说明 Number为Function构造函数的实例，Number上定义的属性
 * 和方法会从Number实例上寻找，如果没有找到，则根据原型链向后查找
 * NOTE:这也是为什么Number、String、Object可以直接调用method方法的根本原因
 */

// 取整
Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
})
console.log((-10 / 3).integer()) // -3

// 去除字符串首尾空白
String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
})
console.log("  neat  ".trim()) // 'neat'

// 获取对象自身属性
Object.method('getOwnKey', function () {
  const ownKey = [];
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      ownKey.push(key)
    }
  }
  return ownKey;
})
console.log({ a:1, b:2, c:3 }.getOwnKey()) // ['a', 'b', 'c']