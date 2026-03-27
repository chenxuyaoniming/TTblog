### HTTP

HTTP 是浏览器与服务器通信的基础，前端需要理解：**方法语义**、**状态码**、**缓存**与 **HTTPS** 大致流程。

#### 核心概念

- **请求/响应**：URL、方法（GET/POST/PUT/DELETE 等）、首部（`Content-Type`、`Cache-Control`）、正文。
- **无状态**：依赖 Cookie、Session、Token 等维持登录态；跨域由 CORS 等机制约束。
- **版本差异**：HTTP/1.1 管线化有限、队头阻塞；HTTP/2 多路复用；HTTP/3 基于 QUIC。

#### 本站相关笔记

| 文章 | 内容 |
| ---- | ---- |
| [HTTP 基础](/http/http) | 协议与常见场景 |
| [从输入 URL 到页面](/http/enterUrl) | 导航与资源加载链路 |
| [状态码](/http/status) | 2xx / 3xx / 4xx / 5xx 含义与缓存、重定向要点 |

#### 学习建议

先建立「一次页面打开涉及哪些请求、缓存如何命中」的整体图，再深入 TLS、HTTP/2 与性能指标（TTFB、FCP 等）。
