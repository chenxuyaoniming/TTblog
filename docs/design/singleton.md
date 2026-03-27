#### 单例模式
- 一个类仅有一个实例
- 只能创建一次,再次创建返回第一次创建的实例
- 闭包
- 匿名函数
#### 以函数形式创建

下面示例中 `getInstance` 挂在 `prototype` 上时，`this` 易指向实例而非构造函数，**不推荐**；仅作历史笔记保留。更稳妥写法见文末 **静态方法**。

```js
function Singleton(name) {
  this.name = name;
}

Singleton.prototype.getInstance = function () {
  if (this.instance) {
    return this.instance;
  } else {
    this.instance = new Singleton(name);
    return this.instance;
  }
};
```

#### 静态方法（推荐）

```js
function Singleton(name) {
  this.name = name;
}
Singleton.getInstance = (function () {
  let instance;
  return function (name) {
    if (!instance) instance = new Singleton(name);
    return instance;
  };
})();
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

在当前环境某些对象只需要创建一次时，可以使用单例模式（配置对象、全局弹窗控制器等）。**注意**：在模块化（ESM）中，模块本身天然「单例」，有时无需再套一层单例类。