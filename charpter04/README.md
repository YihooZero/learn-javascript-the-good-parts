#### 1: `this`指向

``` javascript
// JavaScript语言精粹demo
var add = function(a, b) {
    return a + b;
}
var myObject = {
    value: 3
};
myObject.double = function() {
    var _this = this;
    var helper = function() {
        _this.value = add(_this.value, _this.value);
    };
    // 以函数的形式调用helper
    helper();
};
// 以方法的形式调用double
myObject.double();
console.log(myObject.value) // 6

// JavaScript高级程序设计demo
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
        }
    }
};
console.log(object.getNameFunc()()) // "The Window"

var name1 = "The Window";
var object1 = {
    name1: "My Object1",
    getNameFunc: function() {
        return this.name1;
    }
};
console.log(object1.getNameFunc()) // "My Object1"
```

>**说明**
>- `JavaScript`语言精粹：当一个函数并非一个对象的属性时，那么它就是被当作一个函数来调用，以此模式调用函数时，`this`被绑定到全局对象。归咎于语言设计的错误 `P28`
>- 注意 `demo` 中 `object` 与 `object1` 的区别
>- `JavaScript`高级程序设计(第3版)：在闭包中，匿名函数的执行环境具有全局性，因此其`this`对象通常指向`window` `P182`

#### 2: `arguments`
>1. `arguments`并不是一个真正的数组，它只是一个“类似数组”的对象。`arguments`拥有一个`length`属性，但它没有任何数组方法
>
>2. 如何将`arguments`转换为一个真正的`Array`
>
>   ```javascript
>   var args = Array.prototype.slice.call(arguments);
>   var args = [].slice.call(arguments);
>   // ES2015
>   const args = Array.from(arguments);
>   const args = [...arguments];
>   ```
>
>   3. 延伸--获取每个对象的类型
>
>      ``` javascript
>        Object.prototype.toString.call(obj)
>        Function.prototype.call.bind(Object.prototype.toString)(obj)
>        Function.prototype.apply.bind(Object.prototype.toString)(obj)
>        Function.prototype.call.call(Object.prototype.toString, obj)
>        Function.prototype.call.apply(Object.prototype.toString, [obj])
>        Function.prototype.apply.call(Object.prototype.toString, obj)
>        Function.prototype.apply.apply(Object.prototype.toString, [obj])
>      ```
>
>      **NOTE**：判断对象类型不能直接用`obj.toString()`,因为除了类型为`[object Object]`以外的其它对象类型实例均有`toString`方法，也就是说`[].toString()`调用的是`Array`实例本身的`toString`方法，虽然其继承自`Object.prototype`，按照原型继承的查找逻辑，当实例中有`toString`方法时就不会去原型链去查找，这也是为什么用`Object.prototype.toString`来判断对象类型的原因。

#### 3: `Function.prototype.method` 原型图理解
<p align="center"><img width="60%" src="https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/prototype.png" alt="原型图"></p>

#### 4: 1 vs Number(1) vs new Number(1)
``` javascript
    typeof 1                                        // 'number'
    typeof Number(1)                                // 'number'
    typeof new Number(1)                            // 'object'

    1         === Number(1)                         // true
    Number(1) === new Number(1)                     // false

    1               instanceof Number               // false
    (new Number(1)) instanceof Number               // true
    
    1..__proto__             === Number.prototype   // true
    (new Number()).__proto__ === Number.prototype   // true
    Number.__proto__         === Number.prototype   // false
    Number.__proto__         === Function.prototype // true
```
>1. 1是一个常量(基本数据类型)
>   - `1.__proto__`会报错，原因是这里的`.`发生了歧义，它既可以理解为小数点，也可以理解为获取属性或者方法；这里的`.`紧跟在数字后面，解释器把`.`判断为一个小数点，小数点后面跟属性或者方法自然抛错了
>   - 可做如下修改:
>       1. `(1).__proto__`
>       2. `1..__proto__`
>       3. `1.0.__proto__`
>       4. `1. __proto__`
>2. `Number`是一个转型函数，它可以用于把任何数据类型转换成数值，转换规则详见`JavaScript高级程序设计(第3版)P30`
>3. `new Number()`为包装对象，它是一个名为`Number`的对象，它是`Number`的实例(前提是`Number`构造函数没有`return`一个值)
>4. 基本数据类型与包装类型的转换方式如下
>   - 基本 -> 包装: `new Number(1)`
>   - 包装 -> 基本: `(new Number(1)).valueOf()`

#### 5: 作用域链
某个函数被调用时，会创建一个执行环境及相应的作用域链

``` javascript
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
```
**作用域链图解**
<p align="center"><img width="80%" src="https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/scopeChain1.png" alt="作用域链图解1"></p>

``` javascript
function createComparisonFunction(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}
var compareNames = createComparisonFunction('name');
var result = compareNames({ name: 'Nicholas' }, { name: 'Greg' })
```
**作用域链图解**
<p align="center"><img width="80%" src="https://github.com/YihooZero/learn-javascript-the-good-parts/blob/main/imgs/scopeChain2.png" alt="作用域链图解2"></p>

>- **`NOTE1`**：一般而言，当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域(全局执行环境的变量对象)，`compare`方法属于这一类
>- **`NOTE2`**：但是闭包情况又有所不一样，匿名函数从`createComparisonFunction()`中被返回后，它的作用域链被初始化为包含`createComparisonFunction()`函数的活动对象和全局变量对象。这样，匿名函数就可以访问在`createComparisonFunction()`中定义的所有变量。更为重要的是，`createComparisonFunction()`函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。当`createComparisonFunction()`函数返回后，其执行环境的作用域链会被销毁，但它的活动对象仍然会留在内存中；直到匿名函数被销毁后(`compareNames  = null`)，`createComparisonFunction()`的活动对象才会被销毁。


#### 6: 闭包
>- 概念: 闭包指的是那些引用了另一个函数作用域中变量的函数
>- 特性1：可以捕捉到局部变量(和参数)，并一直保存下来
>- 特性2：同一个作用于链中定义多个闭包，这多个闭包共享同样的私有变量或变量

- [扩充类型的功能](https://github.com/YihooZero/learn-javascript-the-good-parts/tree/main/charpter04/AugmentingTypes.js)
- [递归算法(汉诺塔递归理解)](https://github.com/YihooZero/learn-javascript-the-good-parts/tree/main/charpter04/Recursion.js)
