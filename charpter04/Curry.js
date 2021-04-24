Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}

Function.method('curry', function () {
  // Array.prototype.slice.apply(arguments)
  // [].slice.apply(arguments)
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      _this = this;
  return function () {
    return _this.apply(null, args.concat(slice.apply(arguments)))
  }
})