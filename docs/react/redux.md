### Redux -- 状态管理器
- dispatcher -> action -> reducer -> state -> view
- 数据的单向流动

![redux](https://s0.lgstatic.com/i/image/M00/7E/C6/CgqCHl_PVh-ATfOGAAB089LdYcY341.png)

更新过程： 
**dispatch**: 派发更新事件  
**action**: 返回一个包含type，data属性的对象，type为修改state的类型，data为修改的值  
**reducer**: 拿到action的返回值，对state按规则进行更新  
**state**: state更新完毕，通知视图进行更新

![](https://s0.lgstatic.com/i/image/M00/84/07/Ciqc1F_TF96ACQdrAADNE7uQ1fw478.png)


Redux的**发布-订阅模式**：**subscribe**

- 初始化store时，调用store.subscribe来进行注册监听，并将监听函数放入一个listener数组内
- 调用dispatch时，在reducer执行完毕，store更新后，浅拷贝一份listener数组执行更新

![](https://s0.lgstatic.com/i/image/M00/84/13/CgqCHl_TGCiAfm8CAAEEFFa3ZxA563.png)

（监听函数的保存与删除在nextListeners数组中进行操作，执行时在currentListener内执行）
```js
    let currentListener = [];
    let nextListener = [];
    // add
    function subscribe() {
        ...
        // ensureCanMutateNextListeners
        if (currentListener === nextListener) {
            nextListener = currentListener.slice()
        }
        nextListener.push(listener)
        ...
        // 返回一个取消监听函数
        return function() {
            // ensureCanMutateNextListeners
            if (currentListener === nextListener) {
                nextListener = currentListener.slice()
            }
            const index = nextListener.findIndex(listener)
            nextListener.splice(index, 1)
        }
    }

    // run
    function dispatch(action) {
        ...
            const listeners = (currentListener = nextListener);
            listeners.forEach(cb => cb())
        ...
    }

```