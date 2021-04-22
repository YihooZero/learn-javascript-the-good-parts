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
}
hanoi(3, 'Src', 'Aux', 'Dst')

/*
 * 运用递归访问DOM数中的每个节点
 * Step1: 对node进行一系列操作，即func(node)
 * Step2: 判断是否有子节点，若有递归调用
 * Step3: 判断是否有兄弟节点，若有递归调用
 *
 */
var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

walk_the_DOM(document.body, function (node) {
  console.log(node);
});

// 上面递归没考虑到第一个DOM的兄弟节点
// 下面这种写法更容易理解
function walk(node, func) {
  var children = node.childNodes;
  for (var i = 0; i < children.length; i++)
    walk(children[i], func);
  func(node);
}
