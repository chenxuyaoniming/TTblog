#### 单例模式
- 一个类仅有一个实例
- 只能创建一次,再次创建返回第一次创建的实例
- 闭包
- 匿名函数
#### 以函数形式创建
```js
    function Singleton(name) {
        this.name = name;
    }

    Singleton.prototype.getInstance = function() {
        if (this.instance) {
            return this.intance
        } else {
            this.intance = new Singleton(name);
            return this.intance;
        }
    }
```
#### 代理模式创建
```js
    function Singleton(name) {
        this.name = name;
    }

    const createSingleton = (function(name) {
        let singleton;
        return function() {
            if (singleton) {
                return singleton
            } else {
                singleton = new Singleton(name);
                return singleton;
            }
        }
    })()
```
#### 直接创建对象或者闭包
```js
    const singleton1 = {
        name: 'singleton',
        getName: function() {
            return this.name
        }
    }

    const singleton2 = (function() {
        const name = 'singleton';
        return {
            getName: function() {
                return name;
            }
        }
    })()
```
#### 用途
在当前环境某些对象只需要创建一次时，可以使用单例模式