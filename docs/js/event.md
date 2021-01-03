### JS事件循环 - Event Loop

#### js是单线程语言
  js是单线程语言，同一时间只能执行一件事，h5规范中提出web worker,允许js注册多个线程，
但是这些线程都是受主线程控制，不得操作DOM，所以仍然是单线程。

#### 任务队列
因为js是单线程的，所以任务必须一个一个执行，如果前面的任务计算量过大，会阻塞后面任务的执行
，但是如果前面的任务需要等待IO接口，此时cpu就会空闲下来，如果出现这种情况，js设计者认为此时
可以完全不必等待IO接口返回结果,将这个任务挂起，继续往下执行任务，如果IO接口返回了结果，
那么再转过头来把之前挂起的任务继续执行下去。这样，任务就分成了两种，同步任务，异步任务。

- **同步任务**：任务自上而下执行，只有上一个任务执行完毕之后，才会执行下一个任务

- **异步任务**：不进入主线程，进入的是任务队列（task queue），只有任务队列通知主线程后，异步任务才会被放入主线程执行

#### 运行机制
1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）
2. 主线程之外，还存在一个任务队列，只要异步任务有了结果，就在任务队列中放入一个事件
3. 一旦执行栈中的同步任务执行完毕，系统就会读取任务队列中的事件，放入主线程中执行
4. 主线程循环执行第三步
![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100801.jpg)
   
- **只要主线程空了，就会读取任务队列，这就是js的运行机制**
- **异步事件执行，挂机了回调函数**
- **主线程从任务队列中读取任务是不断循环的，所以这一机制被称之为event loop**

#### Event Loop

![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)
主线程运行的时候产生堆（heap）和栈（stack），栈中的代码调用各种外部api，这些api
在任务队列中加入各种事件（click,done,load），只要栈中的代码执行完毕，主线程就回
去读取任务队列，依次执行那些事件所对应的回调函数，<font color='red'>执行栈中的代
码，总是在读取任务队列之前执行（不一定执行完）</font>
```js
let xhr = new XMLHttpRequest();
xhr.open('get', '/');
xhr.send()
// onload onerror为xhr执行过程中的回调函数，js会在执行完执行栈中的方法后再去读
// 取任务队列，所以声明位置不需要和send保持严格上下关系
xhr.onload = function() {};
xhr.onerror = function () {};

```

#### 定时器 settimeout与setinterval
定时器的作用是将回调函数推入任务队列之中，等待n后执行任务，但是n有可能是不准确的，当执行栈中的
任务计算量过大阻塞了线程后，定时器设定的执行时间就会出现偏差
```js
setTimeout(() => {
    console.log(1)
}, 0)
console.log(2)
// 2 1
```
以上执行过程，会先执行执行栈中的任务（console.log(2)），之后再去执行任务队列中的任务

### NodeJs中的Event Loop
![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)
- v8引擎解析js脚本
- 解析后的代码调用node api
- libuv库负责Node Api的运行，他将不同的任务分配给不同的线程，形成一个event loop，以异步的方式将结果返回给v8引擎
- v8引擎将结果反馈给用户

#### process.nextTick && setImmediate
与settimeout类似，将任务推入任务队列，不同的是，process，nextTick可以将其回调函数放在当前执行栈的末尾（主线程读取任务队列之前）执行，
setImmediate方法是将其回调函数放入任务队列的尾部执行
- process.nextTick的回调函数总是在异步方法执行之前执行
- setImmediate的回调总是注册在下一次的event loop中
- process.nextTick总是在本次事件循环中执行，setImmediate总是在下次事件循环中执行，所以process.nextTick
效率要比setImmediate高
```js
console.log(1);

Promise.resolve().then(() => console.log('promise:::2'));

process.nextTick(() => {
    console.log('next::3')
})

setImmediate(() => {
    console.log('setImm::::4')
})

setTimeout(() => {
    console.log('settimeout:::5')
})

console.log('6')


// 1
// 6
// next::3
// promise:::2
// setImm::::4 
// settimeout:::5

// 4和5的执行顺序不是稳定的

```

[阮一峰原文](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)