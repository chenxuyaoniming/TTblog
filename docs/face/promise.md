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


---

#### Promise.all 思路与实现

**思路：**

- **输入**：Promise 数组（或可迭代对象）。
- **行为**：所有 Promise **都 resolve** 时，返回结果数组（顺序与输入一致）；**任一 reject** 立刻短路返回 reject 理由。
- **要点**：计数器记录完成数量；用数组按索引保存结果（保持顺序）；任一失败立刻 reject。

**手写实现：**

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }

    const results = [];
    let completed = 0;
    const total = promises.length;

    if (total === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      // 兼容非 Promise 值（包装为 Promise）
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value; // 按索引保存，保证顺序
          completed++;
          if (completed === total) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err); // 任一失败立刻 reject
        });
    });
  });
};
```

**测试：**

```js
const p1 = Promise.resolve(1);
const p2 = new Promise((res) => setTimeout(() => res(2), 100));
const p3 = Promise.resolve(3);

Promise.myAll([p1, p2, p3]).then((res) => {
  console.log(res); // [1, 2, 3]（p2 最慢，但结果按顺序）
});

// 任一失败
Promise.myAll([p1, Promise.reject('err'), p3])
  .then((res) => console.log(res))
  .catch((e) => console.log('捕获:', e)); // 捕获: err
```

---

#### Promise.allSettled 思路与实现

**思路：**

- **输入**：Promise 数组。
- **行为**：**等待所有 Promise 都结束**（无论 resolve/reject），返回结果数组；每项是对象 `{ status, value/reason }`。
- **要点**：**不会短路 reject**；计数器 === total 时 resolve 结果数组。

**手写实现：**

```js
Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }

    const results = [];
    let completed = 0;
    const total = promises.length;

    if (total === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed++;
          if (completed === total) {
            resolve(results);
          }
        });
    });
  });
};
```

**测试：**

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject('error2');
const p3 = new Promise((res) => setTimeout(() => res(3), 50));

Promise.myAllSettled([p1, p2, p3]).then((res) => {
  console.log(res);
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'error2' },
  //   { status: 'fulfilled', value: 3 }
  // ]
});
```

---

#### Promise.race 思路与实现（补充）

**思路：** 返回**最先**完成的 Promise 结果（无论 resolve/reject）。

```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};
```

---

#### Promise.any 思路与实现（补充）

**思路：** 任一 **resolve** 立刻返回；**全部 reject** 才返回 **AggregateError**（所有失败原因）。

```js
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }

    const errors = [];
    let rejected = 0;
    const total = promises.length;

    if (total === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve) // 任一成功立刻 resolve
        .catch((err) => {
          errors[index] = err;
          rejected++;
          if (rejected === total) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};
```

---

#### 四种静态方法对比表

| 方法 | 短路条件 | 返回结果 |
| ---- | -------- | -------- |
| **Promise.all** | 任一 reject 立刻短路 | 所有成功 → 结果数组；任一失败 → 失败原因 |
| **Promise.allSettled** | 无短路，等待全部结束 | `[{ status, value/reason }, ...]` |
| **Promise.race** | 最快的 resolve/reject | 最先完成者的结果 |
| **Promise.any** | 任一 resolve 立刻返回 | 任一成功 → 结果；全失败 → AggregateError |

---

