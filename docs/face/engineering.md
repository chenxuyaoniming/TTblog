### 工程化与构建相关面试题

---

#### 1. Webpack 中 Loader 与 Plugin 区别？

**答：**

|  | Loader | Plugin |
| ---- | ------ | ------ |
| 时机 | **模块加载/编译**时，**文件级** | **整个构建生命周期** |
| 职责 | 把文件转成 Webpack 能理解的 **JS 模块**（链式、从下到上） | 扩展功能：压缩、抽离 CSS、环境变量、分析包体积等 |
| 典型 | `babel-loader`、`css-loader`、`file-loader` | `HtmlWebpackPlugin`、`MiniCssExtractPlugin` |

一句话：**Loader 转译文件；Plugin 监听编译事件、改整个产物。**

---

#### 2. Webpack 构建流程（简述）？

**答：**

1. **初始化参数**：合并配置与命令行。
2. **编译**：创建 `Compiler`，挂载 Plugin。
3. **确定入口**：从 `entry` 递归解析依赖图。
4. **模块编译**：对每个模块用 Loader 处理，生成 AST 等。
5. **输出资源**：组装 chunk、生成 assets。
6. **写入文件**：`emit` 到 `output.path`。

可提：**Tapable** 钩子、`compilation` / `compiler` 区别。

---

#### 3. 什么是 Tree-shaking？生效条件？

**答：**

- 构建时**删除未使用的 export**，减小体积；依赖 **ES Module 静态结构**。
- **条件**：生产模式、**sideEffects** 字段（package.json 标明无副作用文件）、避免整体引入（如 `lodash-es` 按需）。

CommonJS 动态 `require` 难以静态分析，Tree-shaking 效果差。

---

#### 4. 代码分割（Code Splitting）方式？

**答：**

- **入口分包**：多 `entry`。
- **动态 import**：`import()` 返回 Promise，Webpack 自动拆 chunk。
- **公共提取**：`SplitChunksPlugin`（`cacheGroups` 抽 vendor、common）。

---

#### 5. Vite 与 Webpack 主要区别？

**答（口述要点）：**

- **开发**：Vite 用 **原生 ESM** + **esbuild 预构建依赖**，冷启动快；Webpack 先打包再服务。
- **生产**：Vite 默认 **Rollup** 打包。
- **适用**：Vue/React 新项目体验好；超大型、复杂自定义 Webpack 生态项目迁移成本需评估。

---

#### 6. Babel 做什么？`preset` 与 `plugin`？

**答：**

- 把**新语法/提案**转成目标环境可运行的代码（及 polyfill 策略）。
- **Plugin** 单能力（箭头函数、class）；**Preset** 是一组 plugin 的集合（如 `@babel/preset-env` 按 `browserslist` 定目标）。

---

#### 7. 前端模块化规范有哪些？

**答：**

- **IIFE + namespace**：早期。
- **AMD**（RequireJS）：异步，浏览器。
- **CommonJS**：Node、同步 `require`。
- **ES Module**：官方标准，`import/export`，静态分析友好。

---

#### 8. CI/CD 里前端常见步骤？

**答：**

安装依赖 → **Lint/单测** → **构建**（`NODE_ENV=production`）→ 产物上传 OSS/服务器 → **CDN 刷新**；可选类型检查、E2E、SourceMap 上传监控平台。

---

#### 9. Source Map 作用？为何生产要谨慎？

**答：**

- 把压缩后的代码**映射回源码**，便于调试。
- 生产若**公开**完整 sourcemap，可能**泄露源码与业务逻辑**；常见做法：内网保存、**hidden-source-map** 仅上传监控平台。

---

#### 10. package.json 里 `dependencies` 与 `devDependencies`？

**答：**

- **dependencies**：生产运行需要（运行时库）。
- **devDependencies**：仅开发/构建需要（Webpack、Babel、ESLint）。

安装生产包时可用 `npm install --production` 省略 devDependencies（部署镜像时常用）。
