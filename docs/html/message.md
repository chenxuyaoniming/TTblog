### 页面通信

当两个页面的 **协议、域名、端口** 一致时为**同源**；否则为跨域，默认 **JS 无法直接读写对方 DOM**，但可用下面约定方式通信。

---

#### 同源页面之间

| 方式 | 说明 |
| ---- | ---- |
| **BroadcastChannel** | 同源多标签广播，API 比 `storage` 更直接 |
| **localStorage + storage 事件** | A 写入，B 监听 `storage`（**仅同源其他页**，当前页写入不触发自身） |
| **SharedWorker** | 多上下文共享一个后台线程（兼容性需查） |
| **Service Worker** | 配合 `postMessage` 与页面、网络协同 |
| **IndexedDB** | 大容量结构化数据，多页可共享同一库 |

---

#### 跨域页面之间

| 方式 | 说明 |
| ---- | ---- |
| **postMessage** | 父子窗口、`window.open`、iframe 之间传数据（需校验 `event.origin`） |
| **URL hash** | 通过 `hashchange` 传参，容量小、hack 感强 |
| **WebSocket** | 双方连同一服务端，由服务端转发（不依赖同源策略限制 WS 连接本身） |

---

#### LocalStorage

同源页面 A、B：A 修改 `localStorage` 会触发 B 上已注册的 **`storage`** 监听（同一页面内修改**不会**触发自己的 `storage`）。

```js
// pageA
localStorage.setItem('id', '999');

// pageB
window.addEventListener('storage', function (event) {
  console.log(event.key, event.newValue, event.oldValue);
});
```

---

#### BroadcastChannel（同源多标签）

```js
const channel = new BroadcastChannel('app-sync');
channel.postMessage({ type: 'logout' });
channel.onmessage = (e) => console.log(e.data);
```

---

#### postMessage

在**目标窗口引用**上调用 `postMessage`，接收方监听 `message`；**必须校验 `event.origin`**，避免恶意站点窃取数据。

```js
// 发送方（如父页面向 iframe）
iframe.contentWindow.postMessage('hello', 'https://child.example.com');

// 接收方
window.addEventListener('message', function (event) {
  if (event.origin !== 'https://parent.example.com') return;
  console.log(event.data);
});
```