### 异步编程

#### 异步编程的方式
- 事件监听： addeventlistener
- 回调函数： (cb) => cb()
- settimeout: settimeout(() => {}, 1000)
- promise: new Promise()


#### 事件监听:
```js

    onload() {
        $el.addeventListener('type', cb)
    }
    // 给目标注册一个监听事件，当对应操作触发时，执行该事件的回调函数
    // 常用于dom事件的监听
```

#### 回调函数：
```js

    function getValue(count, cb) {
        while(!count) {
            count -= 1;
        }
        // do something
        cb();
    }
    // 回调函数是将一个普通函数A当作参数传入函数B,当函数B执行完某一时刻的操作后，再执行函数B
    // 典型例子：
        ajax({
            success: successCb,
            fail: failCb
        })
    // 缺点：当传入的回调函数过多时，会造成回调地狱，代码不优雅
```
#### settimeout：
js原生方法，属于宏任务，设定延迟时间后执行函数，执行时间可能与设置时间有差异，
由于js时单线程执行，所以当定时器的回调函数的计算量过大时，会阻塞后续回调函数的执行。
```js
    settimeout(), setInterval(),

    settimeout(() => {
        // do something
    }, time)
    // time时间之后执行
    
    setInterval(() => {
        // do something
    }, time)
    //每隔time之后，执行一次
    // 缺点，回调函数的执行不一定会按照设定时间执行。
```
#### promise：
es6新增的js方法，属于微任务，内部三种状态，fullfiled，rejected，padding，该状态不能被外部改变，状态只能由padding -> fullfiled or padding -> rejected，改变操作不可逆，无法再次改变  
promise可以链式调用，then等待上一级状态执行res或err，catch用来捕获这个promise调用链上的错误（有err方法时优先执行err方法，catch不执行），

```js
    new Promise((resolve, reject) => {
        // do something
        resolve()
        // resolve会将padding状态修改为fullfiled
        // 当内部执行的方法出现错误时，promise会自动捕获该错误，并且会立即将
        // padding改为rejected
    })
    .then(res =>{
        // padding -> fullfiled
        return new Promise() // 再次return一个promise对象
    }， err => {
        // padding => rejected 
        // 此方法不写时，错误由下面的catch捕获
    })
    .catch(err => {
        // padding -? rejected
    })
```
- **promise.race([])**: 一个promise队列数组，当其中一个promise返回结果时，会执行then方法，任意错误都会执行catch
```js
    Promise.race([
        p1,
        p2,
        p3
    ])
    .then(res => {
        // resolve.length > 0
    })
    .catch(err => {

    })
```

- **promise.all([])**： 一个promise队列，当其所有的promise都有返回值时（reslove），执行then方法，否则执行catch
```js
    Promise.all([
        p1,
        p2,
        p3
    ])
    .then(res => {
        // resolve.length == promise.length
    })
    .catch(err => {

    })
```
- **promise.join(...promiseArr, cb)** 当promise队列需要同时执行，但是互相没有关联时使用promise.join
```js
    Promise(p1, p2, p3, p4, (p1, p2, p3, p4) => {
        set({
            p1,
            p2,
            p3,
            p4
        })
    })
```

[简单的promise实现](./myPromise.md)


