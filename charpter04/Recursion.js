// 汉诺塔递归算法
// 理解汉诺塔递归: https://www.zhihu.com/question/24385418
var hanoi = function (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log('Move disc ' + disc + ' from ' + src + ' to ' + dst + '\n');
    hanoi(disc - 1, aux, src, dst);
  }
}
hanoi(3, 'Src', 'Aux', 'Dst')