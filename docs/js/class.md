### ES6之Class
class本质是构造函数的语法糖，这种方式让对象原型的写法更加清晰，更符合面向对象编程

```js
    class Foo {
        // constructor 用来为实例添加属性
        constructor(name) {
            this.name = name
        }
        // 方法直接定义在prototype上
        say() {
            console.log(`hellow, i'm${this.name}`)
        }
    }

    class Boo extends Foo {
        constructor() {
            super();
            // super() === Foo.prototype.constructor()
        }
    }
```
**super调用**
| 调用方式 | 指向 |
| ---- | ---- |
| 作为函数直接调用 | super() === 父类.prototype.constructor(), this指向的父类的构造函数 |
| 作为对象调用方法时 | super.say() 相当于调用了 父类的原型对象，super在静态方法中调用时，this直接指向父类 |
| 作为对象进行赋值时 | super指向实例 |