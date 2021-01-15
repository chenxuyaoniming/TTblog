### call，apply，bind简单实现

- 都是用来改变this指向，并且都绑定在Function的prototype上
- call，apply，bind首个参数均是this指向
- call的调用函数参数从第二个入参开始依次向后
- apply的第二个参数是数组，
- bind首次调用返回一个改变this指向的函数，二次调用才会执行

#### **call(this, ...args)**

```js
    // 原生用法
    Array.prototype.slice.call(this, '1', '2', '3')

    // 实现
    Function.prototype.myCall = function(...arg) {
        const that = arg[0] || window;
        that.fn = this;
        const result = that.fn(...arg.slice(1));
        delete that.fn
        return result;
        
    }

```
#### **apply(this, [...])**

```js
    // 原生
    Array.prototype.slice.apply(this, [arg])
    // 简单实现

    Function.prototype.myApply = function(that, params) {

        that = that || window;
        that.fn = this;

        const result = that.fn(...params);

        delete that.fn;

        return result

    }
```

#### **bind(this)(p1, p2, p3...)**

```js
    // 原生
    Array.prototype.slice.bind(this)(1,2,3,4)

    // 简单实现
    Function.prototype.myBind = function(that) {
        that = that || window;
        that.fn = this;
        return function(...arg) {
            const result = that.fn(...arg);
            delete that.fn;
            return result
        }
    }
```

### New 创建实例的过程简单实现

```js
    function myNew(origin) {

        let obj = {}

        obj.__proto__ = origin.prototype

        // Objet.setPrototypeOf(obj, origin.prototype)

        let res = origin.call(obj);
        // 如果res有值且为引用类型那么直接返回这个值
        return res && typeof res === 'object' ? res : obj;
    }
```
