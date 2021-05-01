Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}
// 1、pop实现
Array.method('pop', function () {
  return this.splice(this.length - 1, 1)[0];
});

// 2、push实现
Array.method('push', function () {
  this.splice.apply(
    this,
    [this.length, 0].concat(
      Array.prototype.slice.apply(arguments)
    )
  );
  return this.length;
});

// 3、shift实现
Array.method('shift', function () {
  return this.slice(0, 1)[0];
});

// 4、splice实现
Array.method('splice', function (start, deleteCount) {
  var max = Math.max,
    min = Math.min,
    delta,
    element,
    insertCount = max(arguments.length - 2, 0),
    k = 0,
    len = this.length,
    new_len,
    result = [],
    shift_count;

  start = start || 0;
  if (start < 0) {
    start += len;
  }
  start = max(min(start, len), 0);
  deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0);
  delta = insertCount - deleteCount;
  new_len = len + delta;
  while (k < deleteCount) {
    element = this[start + k];
    if (element !== undefined) {
      result[k] = element;
    }
    k++;
  }
  shift_count = len - start - deleteCount;
  if (delta < 0) {
    k = start + insertCount;
    while (shift_count) {
      this[k] = this[k - delta];
      k++;
      shift_count--;
    }
    this.length = new_len;
  } else if (delta > 0) {
    k = 1;
    while (shift_count) {
      this[new_len - k] = this[len - k];
      k++;
      shift_count--;
    }
    this.length = new_len;
  }
  for (k = 0; k < insertCount; k++) {
    this[start + k] = arguments[k + 2];
  }
  return result
});

// 5、unshift实现;
Array.method('unshift', function () {
  this.splice.apply(this,
      [0, 0].concat(Array.prototype.slice.apply(arguments)));
  return this.length;
});

// 6、Function bind函数实现
Function.method('bind', function (that) {
  var method = this,
    slice = Array.prototype.slice,
    args = slice.apply(arguments, [1]);
  return function () {
    return method.apply(that,
      args.concat(slice.apply(arguments, [0])));
  };
});

// 7、RegExp test方法实现
RegExp.method('test', function (string) {
  return this.exec(string) !== null;
});

// 8、String chartAt方法实现
String.method('charAt', function (pos) {
  return this.splice(pos, pos + 1);
});
