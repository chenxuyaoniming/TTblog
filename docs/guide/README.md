## 学习路线（前端）

以下为建议阅读顺序，可按自身基础跳过已掌握部分。

### 一、基础三件套

1. **HTTP**：理解请求/响应、缓存、常见状态码，再读「从输入 URL 到页面」建立整体链路。
2. **HTML**：语义化、事件模型、浏览器缓存与页面间通信。
3. **CSS**：盒模型、**BFC**、**Flex** 布局；再补响应式与常见兼容思路。

### 二、JavaScript 核心

1. 类型、声明提升、`this`、原型链。
2. **异步**：Promise、事件循环；可对照手写 **Promise** 加深理解。
3. 模块化、面向对象（class）、常用设计模式在业务中的体现。

### 三、框架（二选一深入，另一门了解思想）

- **React**：虚拟 DOM、`setState`、生命周期、Hooks 思想、路由、**Redux / MobX**、性能优化与 Fiber。
- **Vue**：响应式原理（`defineProperty` / Proxy）、组合式 API、**Vuex**、数组更新检测。

### 四、工程化与类型

1. **Webpack**：`entry` / `output`、`loader` 与 `plugin` 分工、`resolve` 与本地开发。
2. **Vite**：原生 ESM 开发服务器、esbuild 预构建、Rollup 生产打包；配合 [Vite](/vite/) 章节对比理解。
3. **TypeScript**：基础类型、泛型、声明文件与项目脚手架（可参考 `/ts/create`）。

### 五、AI 前端应用（新方向）

- **对话界面**：流式渲染、Markdown 解析、代码高亮（见 [AI 前端应用](/ai/)）。
- **Prompt 技巧**：角色、Few-shot、CoT；提升模型输出质量（见 [Prompt Engineering](/ai/prompt)）。
- **RAG**：向量检索 + LLM 生成，让对话有依据（见 [向量检索](/ai/rag)）。
- **LangChain.js**：封装 Memory、Agent、工具链（见 [LangChain](/ai/langchain)）。

### 六、拓展

- **数据结构与算法**：排序、链表等高频题。
- **设计模式**：单例、观察者等在框架与业务中的对应关系。
- **面试题**：集中演练 Promise 并发、深拷贝、布局与框架原理题。

### 相关入口

- 站点首页：[返回首页](/)
- 个人介绍：[aboutMe](/aboutMe)
