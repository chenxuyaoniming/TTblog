### vue双向绑定原理

vue使用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

- **Object.defineProperty**
- **发布-订阅者模式**

**基本模块**
- **observer（观察者）**: 监听数据属性，发生改变时去通知watcher修改视图
- **watcher（订阅者）**：数据修改时，执行响应回调
- **dep（订阅管理器）**：作为observer和watcher的桥梁，内部维护一个数组，保存与当前观察者相关的watcher

### 过程

在vue初始化时（created之前），会初始化observer和watcher，observer循环监听对象属性，当属性发生改变时（setter）会触发watcher的更新，
watcher会对当前实例进行属性订阅，当属性发生改变时，可以及时更新相关dom，wacther的update方法会在初始化时触发一次，这样会触发观察者的getter方法，将此订阅者的update方法推入dep队列之中，
完成observer.set -> dep.notify -> watcher.update的事件闭环，dep下维护了一个watcher数组，当触发dep.notify时，会循环执行当前dep下的subs的更新，此外还会维护一个全局变量，用以保存
当前进行渲染的实例，Dep.target指向当前正在更新的观察者，当更新完成后现需要将Dep.target的指向修改为null

### Observer（监听者）
```js
// 监听器
/**
 * 
 * @param {源对象}} obj 
 * @param {键} key 
 * @param {值} val 
 */
const observer = (obj, key, val) => {
    var dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get() {
            // 这里是最重要的一点，是observer和watcher产生连接的关键
            Dep.target && dep.add(Dep.target)
            return val;
        },
        set(newVal) {
            if (val !== newVal) {
                val = newVal;
                dep.notify();
            }
        }
    })

}
/**
 * @description 实例初始化时，将data属性进行劫持
*/
function defineProperty(data) {
    if (typeof data !== 'object') {
        console.error('type must be object')
        return;
    }
    Object.keys(data).forEach(key => {
        typeof data[key] == 'object'
            ? defineProperty(data[key])
            : observer(data, key, data[key]);
    })
}

```
### Watcher（观察者）
```js

class Watcher {
    /**
     * data 当前实例
     * prop 当前实例使用的属性
     * fn 属性改变时执行的回调方法
     * **/
    constructor(data, prop, cb) {
        // 保存当前实例的data
        this.data = data;
        // 当前观察者所观察的数据的key string | string[]
        this.prop = prop;
        // 当前实例需要执行的方法 -> 重新渲染dom
        this.cb = cb;
        // 初始化的需要调用一次更新方法，渲染dom并触发observer的get，将自身推入当前实例的dep.subs
        this.value = this.getValue();
        this.cb(this.value);
    }
    update() {
        console.log('update:::触发了watcher')
        this.cb(this.data[this.prop[0]]);
    }
    getValue() {
        Dep.target = this;
        const value = this.data[this.prop[0]];
        Dep.target = null;
        return value;
    }
}

```

### dep 观察者队列
```js
class Dep {
    subs = []
    // 当前活动的watcher，默认为null，当watcher执行完毕之后，需要将它再次初始化
    static target = null
    add(sub) {
        this.subs.push(sub)
    }
    notify() {
        console.log('notity:::数据变动，准备执行update')
        this.subs.length && this.subs.forEach(watch => {
            watch.update()
        })
    }
}
```
### 当前代码执行示例
```js
class MyVue {

    constructor(data, cb) {
        this.data = data;
        this.cb = cb;
        this.initDefineObserver(this.data);
        new Watcher(data, Object.keys(data), cb)
    }

    watcher = Watcher

    observer = observer

    initDefineObserver(data) {
        if (typeof data !== 'object') {
            console.error('type must be object')
            return;
        }
        Object.keys(data).forEach(key => {
            typeof data[key] == 'object'
                ? initDefineObserver(data[key])
                : observer(data, key, data[key]);
        })
    }
}

var v = new MyVue({content: ''}, function vdom(content = '') {
    document.querySelector('#root').innerHTML = content;
}) 

```