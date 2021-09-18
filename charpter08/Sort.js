// 1、基本比较
var n = [4, 8, 15, 16, 23, 42];
n.sort(function (a, b) {
  return a - b;
});
// n是[4, 8, 15, 16, 23, 42]

// 2、包含数字和字符串排序
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
m.sort(function (a, b) {
  if (a === b) {
    return 0;
  }
  if (typeof a === typeof b) {
    return a < b ? -1 : 1;
  }
  return typeof a < typeof b ? -1 : 1;
});
// m是[4, 8, 15, 16, 23, 42, 'a', 'aa', 'bb']

// 3、对象数组排序
var by = function (name) {
  return function (o, p) {
    var a, b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw {
        name: 'Error',
        message: 'Expected an object when sorting by ' + name
      }
    }
  }
}
var s = [
  {first: 'Joe', last: 'Besser'},
  {first: 'Moe', last: 'Howard'},
]
s.sort(by('first'));

/**
 * 此sort方法不是稳定的
 * 排序的稳定性是指排序后数组中的相等值的相对位置没有发生改变
 * 不稳定性排序会改变相等值得相对位置
 * 修改后的方法如下
 */
var by1 = function (name, minor) {
  return function (o, p) {
    var a, b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw {
        name: 'Error',
        message: 'Expected an object when sorting by ' + name
      }
    }
  }
}
// 如下调用
s.sort(by1('last', by1('first')));