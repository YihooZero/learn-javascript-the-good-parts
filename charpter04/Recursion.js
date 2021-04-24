// 汉诺塔递归算法
// 理解汉诺塔递归: https://www.zhihu.com/question/24385418
/*
 * disc:汉诺塔的层数
 * src :初始位置
 * aux :辅助位置
 * dst :目标位置
 * 假设有n层汉诺塔，可以简化为以下3个步骤
 * Step1: 将n-1层从src移动至aux通过dst,即hanoi(n-1, src, dst, aux);
 * Step2: 将第n层从src移动至dst
 * Step3: 将n-1层从aux移动至dst通过src,即hanoi(n-1, aux, src, dst);
 * 理解过程借阅此文章:https://javascript.plainenglish.io/understanding-recursion-by-implementing-the-tower-of-hanoi-in-javascript-a83a54a62f40
 */
var hanoi = function (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst + '\n');
    hanoi(disc - 1, aux, src, dst);
  }
};
hanoi(3, 'Src', 'Aux', 'Dst')

/*
 * 运用递归访问DOM树中的每个节点
 * Step1: 对node进行一系列操作，即func(node)
 * Step2: 判断是否有第一个子节点，若有->递归调用
 * Step3: 判断是否有兄弟节点，若有->递归调用
 */
var walk_the_DOM_one = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

var walk_the_DOM_two = function walk_other(node, func) {
  func(node);
  if (node.firstChild)
    walk_other(node.firstChild, func)
  if (node.nextSibling)
    walk_other(node.nextSibling, func)
};

// 这种写法更容易理解
function walk_the_DOM_three(node, func) {
  var children = node.childNodes;
  for (var i = 0; i < children.length; i++)
    walk_the_DOM_three(children[i], func);
  func(node);
}

// 上面3种写法都是对DOM树递归获取DOM节点
walk_the_DOM_three(document.body, function (node) {
  console.log(node)
})

// Fibonacci数列递归
/*
 * n表示数列的第n项
 * Step1: 斐波那契数列的第n项为第(n-1)项和第(n-2)的和
 * Step2: 当n <= 2时为n本身
 */
function Fibonacci(n) {
  if (n > 2) {
    return Fibonacci(n - 1) + Fibonacci( n - 2 )
  }
  return n
}
console.log(Fibonacci(10))

