### vue如何监听数组
- 改写数组方法
    - pop
    - push
    - shift
    - unshift
    - splice
    - reverse
    - sort
- 对数组的修改的值进行处理
- 改写过后的方法通过__proto__挂在到数组上
- 在不支持__proto__的环境下，直接将方法绑定在目标数组上

```js
function observeArray() {
    const arrayFnName = [
        'push',
        'pop',
        'shift',
        'unshift',
        'reverse',
        'splice'
    ]
    const arrayPrototype = Array.prototype;
    const matchArrayPrototype = Object.create(arrayPrototype);
    
    function def(target, key, value) {
        Object.defineProperties(target, key, {
          configurable: false,
          writable: true,
          enumerable: true,
          value
        })
    }
    arrayFnName.forEach(key => {
        def(matchArrayPrototype, key, function(...args) {
              // 原生数组方法对数组进行操作，并获取返回值
            const res = Array[key].apply(this, args);
            // 获取vue当前observer的实例，一般会绑定在数组的__ob__上
            const ob = this.__ob__;
            
            let insert;
            
            switch (key) {
              case 'push':
              case 'unshift':
                  insert = res;
                  break;
              case 'splice':
                  insert = args.slice(2);
                  break;
            };
            // 对插入的元素进行监听
            insert && ob && ob.observeArray(res);
            // 触发实例的更新
            ob && ob.dep.notify();
            // 返回原生函数执行完毕的返回值
            return res;
        })
    })
  
    return function(target) {
        if ('__proto__' in {}) {
            target.__proto__ = matchArrayPrototype;
        } else {
            arrayFnName.forEach(key => {
                def(target, key, matchArrayPrototype[key])
            })
        }
    }
}
```