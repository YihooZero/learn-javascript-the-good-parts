#### 1、`new`操作符调用构造函数会经历以下步骤

-  创建一个新对象；
-  将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
-  执行构造函数中的代码（为这个新对象添加属性）；
-  返回新对象。

#### 2、原型链图解

![原型链](https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/Inheritance2.jpg)

#### 3、原型继承问题解析

```javascript
// 以下代码Cat继承了Mammal
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
}

Function.method('inherits', function (Parent) {
  this.prototype = new Parent();
  return this;
})

var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function () {
  return this.name;
};

Mammal.prototype.says = function () {
  return this.saying || '';
};

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
}
  .inherits(Mammal)
  .method('purr', function (n) {
    var i, s = '';
    for (i = 0; i < n; i++) {
      if (s) {
        s += '-'
      }
      s += 'r'
    }
    return s;
  })
  .method('get_name', function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
  });

var cat = new Cat('Yihoo');
console.log(cat.get_name());

```

> **NOTE:**`cat.get_name()`第一反应打印出来的应当是`meow Yihoo meow` ，可实际上打印出来的是`Yihoo`。仔细想想，里面其实有个陷阱，因为`Cat`继承自`Mammal`，在执行`Cat.method('get_name', func)`方法时，`if`条件判断语句中的`!this.prototype[name]`为`false`，也就是说`Cat.prototype.get_name`有定义，其根据原型链查找到`Mammal.prototype.get_name`方法，故`Cat.prototype`中没有定义`get_name`方法。具体原型继承图如下

![原型继承图](https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/Inheritance3.png)

