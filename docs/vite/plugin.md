### Vite 插件开发

Vite 插件兼容 **Rollup 插件 API**，并在开发与构建阶段提供额外钩子；可用于转译、优化、虚拟模块等场景。

---

#### 插件结构

```ts
import type { Plugin } from 'vite';

export default function myPlugin(): Plugin {
  return {
    name: 'my-vite-plugin', // 必填，会在警告和错误中显示
    
    // Vite 独有钩子
    config(config, env) {
      // 修改 Vite 配置（早于 configResolved）
      return { /* 合并配置 */ };
    },
    
    configResolved(resolvedConfig) {
      // 配置确定后，可保存供后续钩子使用
    },
    
    configureServer(server) {
      // 配置开发服务器（添加中间件等）
      server.middlewares.use((req, res, next) => {
        // 自定义处理
        next();
      });
    },
    
    // Rollup 通用钩子（部分）
    resolveId(id) {
      // 解析模块路径（虚拟模块、alias 等）
      if (id === 'virtual:my-module') {
        return id; // 返回标识表示由本插件处理
      }
    },
    
    load(id) {
      // 加载模块内容
      if (id === 'virtual:my-module') {
        return 'export default { msg: "hello" }';
      }
    },
    
    transform(code, id) {
      // 转换模块内容（Loader 类似职责）
      if (id.endsWith('.custom')) {
        return {
          code: code.replace(/MAGIC/, 'replaced'),
          map: null // sourcemap
        };
      }
    }
  };
}
```

---

#### 插件钩子顺序（简化）

**开发阶段**：`config` → `configResolved` → `configureServer` → `transformIndexHtml` → **各模块请求时** `resolveId` → `load` → `transform`

**生产构建**：`config` → `configResolved` → `buildStart` → 各模块 `resolveId`/`load`/`transform` → `renderChunk` → `generateBundle`

---

#### 使用场景示例

| 场景 | 钩子 |
| ---- | ---- |
| 转译自定义文件格式 | `transform` |
| 虚拟模块（如配置注入） | `resolveId` + `load` |
| 自动导入组件（类似 unplugin） | `transform`（AST） |
| 生产产物优化 | `generateBundle` |

---

#### 与 Webpack Loader/Plugin 对比

- **Vite transform** ≈ **Webpack loader**（单文件转译）。
- **Vite 插件钩子** ≈ **Webpack plugin**（构建全局）。
- Vite 插件可同时做文件转译与构建流程介入；Rollup 生态插件可直接用（需测试兼容性）。

---

#### 学习建议

先读[官方插件开发文档](https://cn.vitejs.dev/guide/api-plugin.html)；可参考 `@vitejs/plugin-vue`、`vite-plugin-pages` 等成熟插件源码。
