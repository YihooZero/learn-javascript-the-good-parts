function constfunc(v) {
  return function () {
    return v
  }
}
var funcs = [];
for(var i = 0; i < 10; i++) {
  funcs[i] = constfunc(i)
}

console.log(funcs[5]())  // 5
console.log(funcs[6]())  // 6

/*
 * 即使外部函数已经返回，闭包仍能访问外部函数定义的变量
 * 特性1(可以捕捉到局部变量(和参数)，并一直保存下来)的体现
 */
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;        // 访问外部的scope
  }
  return f;              // 外部函数返回
}
checkscope()()           // 'local scope'

/*
 * 1、同一个作用域链中创建了10个闭包，这些闭包都是在同一个函数调用定义的，因此共享i
 *    当constfunc1()返回时，变量i的值是10，所有闭包都共享这一值
 *    JavaScript权威指南(犀牛书第6版 187解释)
 * 2、闭包只能取得包含函数中任何变量的最后一个值
 *    funcs中的每个函数的作用域链中都保存着constfunc1的活动对象，他们引用的都是同一个变量i
 *    当constfunc1执行完成后，变量i为10，此时每个函数都引用着保存变量i的同一个变量对象，所以
 *    每个函数内部i的值都是10
 *    JavaScript高级程序设计(第3版 181解释)
 * 特性2(同一个作用于链中定义多个闭包，这多个闭包共享同样的私有变量或变量)的体现
 */
function constfunc1() {
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs[i] = function () {
      return i;
    }
  }
  return funcs;
}

console.log(constfunc1()[5]())  // 10
console.log(constfunc1()[6]())  // 10

// 针对同一作用域链多个多个闭包共享变量，做如下改动，可以得到自己想要的结果
function constfunc2() {
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs[i] = function (num) {
      return function () {
        return num;
      }
    }(i)
  }
  return funcs;
}

console.log(constfunc2()[5]())  // 5
console.log(constfunc2()[6]())  // 6