// 构造一个用0填充的4 * 4矩阵
Array.matrix = function (m, n, initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i++) {
    a = [];
    for (j = 0; j < n; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

var myMatrix = Array.matrix(4, 4, 0);
console.log(myMatrix);

// 用来构造一个单位矩阵的方法
Array.identity = function (n) {
  var i, mat = Array.matrix(n, n, 0);
  for (i = 0; i < n; i++) {
    mat[i][i] = 1
  }
  return mat;
};
myMatrix = Array.identity(4);
console.log(myMatrix);
console.log(myMatrix[3][3]);