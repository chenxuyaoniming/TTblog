### Promise面试题

#### promise执行顺序
```js
1    new Promise((resolve,reject) => {
        console.log('p1')
        resolve()
    2    Promise.resolve().then(res => {
            console.log('p2')
        3    Promise.resolve().then(res => {
                console.log('p3')
            })
        4    Promise.resolve().then(res => {
                console.log('p4')
            })
        })
    5    .then(res => {
            console.log('then2')
        })
6    }).then(res => {
        console.log('then1')
    })

7    console.log('script')

    // p1
    // script
    // p2
    // then1
    // p3
    // p4
    // then2
    /**
     * 1， 7是同步任务，所以会按顺序打印
     * p1
     * script
     * 同时，将2. 6 推入当前的微任务队列，
     * 1.7执行完之后之后会按顺序执行微任务2.6 所以打印出
     * p2
     * then1
     * 在2执行之后，会将3.4, 5推入下一个执行栈的微任务队列, 所以之后会打印出
     * p3
     * p4
     * **/
```
#### promise执行机制&事件循环
```js
let a;
const b = new Promise((resolve, reject) => {
        console.log('promise1');
        resolve();
    }).then(() => {
        console.log('promise2');
    }).then(() => {
        console.log('promise3');
    }).then(() => {
        console.log('promise4');
    });

a = new Promise(async (resolve, reject) => {
    console.log(a);
    await b;
    console.log(a);
    console.log('after1');
    await a
    resolve(true);
    console.log('after2');
});

console.log('end');
// promise1
// undefined
// end
// promise2
// promise3
// promise4
// Promise { pending }
// after1
/**
 * 
 * 第一个输出 promise1，是因为 Promise 里的方法
即执行。接着调用 resolve，只不过 then 里的方法等下一个周期。
  第二个输出 undefined，是因为立即执行执行 a 内部
方法，先 console.log(a)，但此时的 a 还没赋值给左边的变量，所以只能是 undefined。然后 await b 就得等下一个周期执行了。
  第三个输出 end，自然不意外。
接着输出 promise2，promise3，promise4，是因为 await b 等待他执行完了，才轮到 a 内部继续执行。
  之后输出 Promise { pending }，事件都进入了循
了，a 已经被赋值成了 Promise 对象。所以第二遍 console.log(a)，自然就输出这个了。之后输出after1。
 * **/
```
#### promise实现最大并发请求数
```js
    function fetcher(id = 1, cb) {
    return fetch(`http://127.0.0.1:5500?id=${id}`,{
        method: 'get',
    })
    .then(res => res)
    .then(res => {
        console.log(res.url)
        cb();
    })
}

function limitFetcher(urlList, limit) {
    let index = limit;
    let length = urlList.length;
    function runNext() {
        if (index >= length) {
            return;
        }
        fetcher(urlList[index], runNext)
        index ++;
    }
    for(var i=0;i<limit;i++) {
        fetcher(url[i], runNext)
    }
}
/**
 * 思路：首次请求最大并发数，之后每完成一个请求，自动进行下一个请求，当请求数大于url数时，停止
 * **/

```


