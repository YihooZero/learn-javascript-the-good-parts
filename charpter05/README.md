#### 1、`new`操作符调用构造函数会经历以下步骤

-  创建一个新对象；
-  将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
-  执行构造函数中的代码（为这个新对象添加属性）；
-  返回新对象。

#### 2、原型链图解

![原型链](https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/Inheritance2.jpg)

