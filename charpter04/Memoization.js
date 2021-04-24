// 在memo数组中保存存储结果，函数被调用时，首先检查结果是否已经存在，如果存在就立即返回这个结果
// 避免重复计算，影响性能
var fibonacci = function () {
  var memo = [0, 1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
};

var fibonacciArray = [];
for (var i = 0; i <= 20; i++) {
  fibonacciArray.push(fibonacci()(i))
}
console.log(fibonacciArray)

// 封装成一个通用的记忆函数
var memoizer = function (memo, formula) {
  var recur = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

var fibonacci1 = memoizer([0, 1], function (recur, n) {
  return recur(n - 1) + recur(n - 2);
})

// 记忆阶乘函数
// n! = 1 * 2 * 3 * ...(n - 1) * n;
var factorial = memoizer([1, 2], function (recur, n) {
  return n * recur(n - 1);
})