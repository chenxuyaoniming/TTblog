### 原型与原型链

- 原型：js的函数都有一个prototype属性 该属性被称为原型对象，每一个函数所构造的实例均可以继承原型对象上的属性和方法，实例上的__proto__属性指向构造函数的prototype属性
- 原型链：通过__proto__与prototype进行连接的一条链表，当访问对象的一个属性或方法的时候，如果这个对象中没有这个 方法或属性，那么Javascript引擎将会访问这个对象的proto属性所指向上一个对 象，并在那个对象中查找指定的方法或属性，如果不能找到，那就会继续通过那个对象 的proto属性指向的对象进行向上查找，直到这个链表结束。

#### 示例
```js
    function foo(name) {
        this.name = name;
    }

    foo.prototype.say = function() {
        console.log(this.name)
    }

    const f = new foo('f');
    f.say();
    // f
    f.__proto__ === foo.prototype
    // true 实例的原型指向构造函数的原型对象
```
#### 原型继承
- 利用__proto__ == prototype ，将公共的方法放在prototype上，那么每一个实例都可以使用该方法
- 当需要继承其他构造函数prototype上的方法时，可以将本构造函数的原型对象指向其他构造函数的实例
```js
    function Foo(name) {
        this.name = name
    }

    function Boo() {
        this.age = '18'
    }
    Boo.prototype.say = function() {
        console.log(`my name is ${this.name}`)
    }

    const f1 = new Foo('f1');
    f1.say()
    // error
    const b1 = new Boo();
    Foo.prototype = b1;

    const f2 = new Foo('f2');
    f2.say();
    // my name is f2
    f2.age === 18;
    // true

    f2 -> f2.__proto__ === Foo.prototype === b1 -> b1.__proto__ === Boo.prototype
```
