### 观察者&发布订阅者
观察者模式中通常有两个模型，一个观察者（observer）和一个被观察者（Observed）。被观察者发生某些行为或者变化时，会通知观察者，观察者根据此行为或者变化做出处理。

![](https://user-gold-cdn.xitu.io/2020/4/22/171a22d6aad37d77?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

```js
let id = 0;
class itemOb {
    constructor() {
        this.id = ++id;
    }
    update() {
        console.log(`订阅者${this.id}号更新了`)
    }
}

class myOb {
    constructor() {
        this.subs = [];
        this.initId = 0;
    }
    addSub(ob) {
        this.subs.push(ob)
    }
    notity() {
        this.subs.length && this.subs.forEach(sub => sub.update())
    }
    remove(it) {
        const index = this.subs.findIndex(sub => sub.id == it.id);
        console.log(`删除了${it.id}`)
        this.subs.splice(index, 1)
    }
}

```

### 发布订阅者模式
与观察者类似，但是中间多了一个调度层，订阅者注册特定的事件，当对应事件触发时，执行对应的的观察者，执行更新
- 订阅者注册事件
- 发布者发布事件

![](https://user-gold-cdn.xitu.io/2020/4/22/171a22f5348aba06?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
```js

class Middleware {
    constructor() {
        this.events = []
    }

    add(type, reader) {
        if (this.events[type]) {
            this.events[type].push(reader)
        } else {
            this.events[type] = [];
            this.events[type].push(reader)
        }
        console.log(`${reader.name}注册了${type}事件`)
    }
    del(type, reader) {
        if (this.events[type]) {
            const idx = this.events[type].findIndex(item => item.id = reader.id);
            this.events[type].splice(idx, 1)
        }
    }
    run(type) {
        console.log(`开始${type}`)
        if (this.events[type]) {
            this.events[type].forEach(item => item.update(type))
        } else {
            console.error(`没有${type}事件的订阅者`)
        }
    }
}

class Observer {
    constructor(dispatch) {
        this.events = []
        this.middle = dispatch
    }

    dispatch(type) {
        this.middle.run(type)
    }
}
let id = 0;
class Reader {
    constructor(name, dispatch) {
        this.name = name;
        this.id = ++id;
        this.dispatch = dispatch;
    }
    subscribe(type) {
        this.dispatch.add(type, this)
    }
    update(type) {
        console.log(`${this.name}执行了${type},done:::::`)
    }
}

const middle = new Middleware();

const observer = new Observer(middle);

const r1 = new Reader('a', middle);
const r2 = new Reader('b', middle);
const r3 = new Reader('c', middle);

```