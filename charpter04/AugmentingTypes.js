Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}

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