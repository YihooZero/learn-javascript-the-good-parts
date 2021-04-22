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