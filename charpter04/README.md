#### this指向

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
```

>**说明**
>- JavaScript语言精粹：当一个函数并非一个对象的属性时，那么它就是被当作一个函数来调用，以此模式调用函数时，this被绑定到全局对象。归咎于语言设计的错误 `P28`
>- JavaScript高级程序设计(第3版)：在闭包中，匿名函数的执行环境具有全局性，因此其this对象通常指向window `P182`

#### arguments
>arguments并不是一个真正的数组，它只是一个“类似数组”的对象。arguments拥有一个length属性，但它没有任何数组方法


- [扩充类型的功能](https://github.com/YihooZero/learn-javascript-the-good-parts/tree/main/charpter04/AugmentingTypes.js)
- [递归算法](https://github.com/YihooZero/learn-javascript-the-good-parts/tree/main/charpter04/Recursion.js)