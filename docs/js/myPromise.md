### Promise简单实现

要点：
- promise内部三种状态，padding, fullfiled, rejected,不可被外部改变，也不可重复改变
- 链式调用，每次都要返回一个promise对象
- promise.all 执行then的条件是resolve的结果需要和传入的函数相等
- promise.race 执行then的条件是resolve的结果最少要一条

#### Promise
```js
const PADDING = 'padding';
const FULLFIELD = 'fullfield';
const REJECTED = 'rejected';


class myPromise {
    constructor(cb) {
        this.status = null;
        this.value = null;
        const resolve = (data) => {
            if (this.status === PADDING) {
                this.status = FULLFIELD;
                this.value = data;
            }
        }

        const reject = (err) => {
            if (this.status === PADDING) {
                this.status = REJECTED
                this.value = err;
            }
        }
        
        try {
            this.status = PADDING;
            const res = cb(resolve, reject)
            
            !!res && resolve(res);
        } catch(err) {
            reject(err);
        }
    }
    then(res, err) {
        console.log(this.status)
        if (this.status === FULLFIELD) {
            res(this.value)
        }
        if (this.status === REJECTED) {
            err(this.value)
        }
    }
    catch(err) {

    }
}

new myPromise((resolve, reject) => {
    resolve('done')
})
.then(res => {
    console.log('then:::', res)
}, err=> {
    console.log('err:::', err)
})

```
以上是简单的promise实现，实现了new promise 并可用then处理resolve和reject状态，

#### 高级promise:可以处理异步promise并可链式调用then
- 内部维护一个fullfiledlist,一个rejectedList队列,then方法执行时状态为panding，将回调函数推入队里之内。当status状态改变时，取出队列内的函数去执行
- 链式调用then，需要将队列内的函数修改为promise形式
- promise2: 就是新生成的promise
- x: 我们要处理的目标
- resolve: promise2的resolve, 执行之后promise2的状态就变为成功了，就可以在它的then方法的成功回调中拿到最终结果。
- reject: promise2的reject, 执行之后promise2的状态就变为失败，在它的then方法的失败回调中拿到失败原因。

```js
const PADDING = 'padding';
const FULLFIELD = 'fullfield';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
	if((typeof x === 'object' && x != null) || typeof x === 'function') {
		// 有可能是promise, 如果是promise那就要有then方法
		let then = x.then;
		if (typeof then === 'function') { // 到了这里就只能认为他是promise了
			// 如果x是一个promise那么在new的时候executor就立即执行了，就会执行他的resolve，那么数据就会传递到他的then中
			then.call(x, y => {// 当前promise解析出来的结果可能还是一个promise, 直到解析到他是一个普通值
				resolvePromise(promise2, y, resolve, reject);// resolve, reject都是promise2的
			}, r => {
				reject(r);
			});
		} else {
			// 出现像这种结果 {a: 1, then: 1} 
			resolve(x);
		}
	} else {
		resolve(x);
	}
}

class myPromise {
    constructor(cb) {
        this.status = null;
        this.value = null;
        this.fullfieldList = [];
        this.rejectedList = [];
        const resolve = (data) => {
            if (this.status === PADDING) {
                this.status = FULLFIELD;
                this.value = data;
                // 当状态改变时，执行下一个then方法
                this.fullfieldList.shift()()
            }
        }
        const reject = (err) => {
            if (this.status === PADDING) {
                this.status = REJECTED
                this.value = err;
                this.rejectedList.shift()()
            }
        }
        this.run(cb, resolve, reject)
    }
    run(cb, resolve, reject) {
        try {
            this.status = PADDING;
            const res = cb(resolve, reject)
            !!res && resolve(res);
        } catch(err) {
            reject(err);
        }
    }
    then(res, err) {
        res =  typeof res == 'function' ? res : res => res;
        err = typeof err == 'function' ? err : err => err;
        const _this = this;
        let promise2 =  new myPromise((resolve, reject) => {
            if (_this.status === PADDING) {
                _this.fullfieldList.push(() => {
                    try {
                        const x = res(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                })
                _this.rejectedList.push(() => {
                    try {
                        const x = err(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                })
            }
            if (_this.status === FULLFIELD) {
                try {
                    const x = res(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e)
                } 
            }
            if (_this.status === REJECTED) {
                try {
                    const x = err(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e)
                }
            }   
        })

        return promise2;
    }
    catch(err) {

    }
}

```

#### catch: 
```js

    class MyPromise {
        ...
        catch(err) {
            return this.then(nll, err)
        }
        ...
    }
```
#### Promise.race:
```js

    MyPromise.race = (promises) => {
        new Promise((resolve, reject) => {
            promises.forEach(item => item.then(resolve, reject))
        })
    }
```

#### Promise.all:
```js
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    } else {
      function processValue(i, data) {
        result[i] = data;
        // 当index == 传入promise的长度时，即可返回
        if (++index === promises.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        //promises[i] 可能是普通值
        Promise.resolve(promises[i]).then((data) => {
          processValue(i, data);
        }, (err) => {
            // 任何一个异步操作出错，就返回reject，
          reject(err);
          return;
        });
      }
    }
  });
}

```
