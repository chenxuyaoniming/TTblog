### 页面通信
当两个页面url的协议，域名，端口号一致时，他们处于同源  
否则，会出现跨域，跨域后信息通信会被浏览器阻止
- **同源**
    - BroadCast Channel
    - LocalStorage
    - service wocker
    - shared wocker
    - indexDB
- **跨域**
    - hash（onhashchange）
    - postMessage
    - websocket
#### LocalStorage
同源的两个页面A和B，当A页面修改localStorage，会触发B页面注册时Storage监听
```js
    // ...pageA
    localStorage.setItem('id', '999')

    // ...pageB
    window.addEventListener('storage', function(event) {
        console.log(event)
    })
```

#### postMessage
在目标窗口的引用上调用postMessage方法，目标窗口定义响应message的监听事件，即可获取传递的信息
```js
    // 发送信息的页面
    const targetWindow = window.open('目标url');
    targetWindow.postMessage('信息’, '指定接受信息的url路径 or *', ’选填参数:transfer');

    // 接受信息的页面
    window.addEventListener('message', function(event) {
        console.log(event)
    })
```