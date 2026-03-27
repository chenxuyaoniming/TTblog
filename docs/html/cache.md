### 缓存

浏览器缓存减轻带宽与延迟，分为**网络层缓存**（HTTP 缓存）与**本地存储**；还可结合 **Service Worker** 做离线缓存策略。

---

#### 网络：强缓存与协商缓存

**强缓存**：在有效期内**不发起网络请求**（或只校验本地），直接使用副本。

- 相关响应头：`Cache-Control`（如 `max-age=31536000`）、`Expires`（HTTP/1.0，以服务器时间为参考）。
- 优先级：`Cache-Control` 通常优先于 `Expires`。

**协商缓存**：**会发请求**，由服务器决定返回 **304** 还是带新内容的 **200**。

- `Last-Modified` + 请求头 `If-Modified-Since`（精度到秒）。
- `ETag` + `If-None-Match`（按内容生成指纹，更可靠）。

**优先级（常见理解）**：先判断强缓存是否过期 → 过期则带协商头发请求 → **304** 读本地副本，**200** 更新缓存。

---

#### 浏览器内部：Memory Cache 与 Disk Cache

| 类型 | 特点 |
| ---- | ---- |
| **内存缓存** | 快、容量小；页面关闭即释放；同站资源可能被优先从内存读 |
| **磁盘缓存** | 持久、容量大；命中后仍可能显示 `from disk cache` |

DevTools Network 中 **from memory cache / from disk cache** 表示未走完整网络或走了本地快速路径。

---

#### 本地存储（与 HTTP 缓存不同）

| 机制 | 说明 |
| ---- | ---- |
| **Cookie** | 小（约 4KB），可随请求携带；可设过期、`HttpOnly`、`SameSite` |
| **localStorage** | 同源持久，不自动随请求发送 |
| **sessionStorage** | 同源 + **标签页**生命周期 |
| **IndexedDB** | 大容量结构化存储，异步 API |

与「页面快不快」相关时：静态资源尽量**长缓存 + 文件名 hash**（更新即换 URL），避免 HTML 被强缓存导致发版不生效。

---

#### Service Worker 缓存

在 SW 中可拦截请求，自定义缓存策略（如 **Cache First**、**Network First**），用于 **PWA**、离线包；需 **HTTPS**（localhost 除外）与注册流程，与上表 HTTP 头缓存是**另一套**可组合能力。
