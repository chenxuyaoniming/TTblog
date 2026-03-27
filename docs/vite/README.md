### Vite

新一代**前端构建工具**，由 Vue 作者尤雨溪开发；开发环境基于 **原生 ESM** + **esbuild 预构建**，冷启动极快；生产环境用 **Rollup** 打包。

---

#### 核心特性

| 特性 | 说明 |
| ---- | ---- |
| **开发服务器** | 原生 ESM（浏览器直接 `import`），按需编译；模块热更新（HMR）快 |
| **依赖预构建** | esbuild 把 CommonJS/UMD 依赖转成 ESM，缓存在 `node_modules/.vite` |
| **生产构建** | Rollup 打包、Tree-shaking、代码分割，兼容性好 |
| **插件机制** | 兼容 Rollup 插件，官方插件涵盖 Vue/React/Preact 等 |

---

#### 对比 Webpack

| 对比项 | Webpack | Vite |
| ------ | ------- | ---- |
| 冷启动 | 需完整打包（大项目慢） | 原生 ESM，秒级 |
| HMR | 较慢（需更新 bundle） | 极快（只重编译改动模块链） |
| 生产 | 高度可配置 | Rollup 默认配置良好 |
| 生态 | 成熟（插件多） | 快速增长 |
| 适用 | 超大型、复杂 webpack 生态项目 | 现代前端新项目（Vue3/React） |

---

#### 基础配置（`vite.config.js/ts`）

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // 或 @vitejs/plugin-react

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
});
```

---

#### 常用脚本

```bash
npm create vite@latest my-app    # 初始化项目
cd my-app && npm install
npm run dev                       # 开发服务器
npm run build                     # 生产构建
npm run preview                   # 预览生产构建产物
```

---

#### 与 Webpack 迁移建议

- **新项目**：Vite 体验更优、配置更简。
- **老项目**：如有大量自定义 Webpack loader/plugin、复杂构建流程，需评估迁移成本（Vite 插件 API 与 Webpack 不同）。
- **混合**：可渐进式在新模块/分包中试用 Vite。

---

#### 环境变量

- 以 `VITE_` 前缀的变量可在客户端代码中通过 `import.meta.env.VITE_*` 访问。
- `.env` / `.env.local` / `.env.production` 等；**敏感信息**仍不应暴露到客户端。

---

#### 学习资源

- [Vite 中文文档](https://cn.vitejs.dev/)
- 配合本站 [Webpack](/webpack/) 对比理解；高级用法可关注 **SSR**、**库模式**、**多页应用配置**等。
