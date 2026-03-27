# GitHub Actions 部署说明

## 当前配置

工作流文件：`.github/workflows/deploy.yml`

### 部署流程

1. **触发**：推送到 `main` 分支或手动触发（Actions 页面）
2. **构建**：
   - 使用 Node.js 20（与本地一致）
   - 安装依赖（`npm ci` 基于 lockfile 更快）
   - 运行 `npm run build` 生成静态文件
3. **部署**：上传 `docs/.vuepress/dist` 到 GitHub Pages

### Node.js 24 兼容

已在 `deploy` 步骤中设置 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`，提前启用 Node.js 24 兼容模式，避免 2026 年 6 月后的强制迁移问题。

---

## 配置 GitHub Pages

### 一、仓库设置

1. 进入仓库 **Settings → Pages**
2. **Source** 选择：**GitHub Actions**（不再用传统的 `gh-pages` 分支）
3. 保存后，推送代码会自动触发部署

### 二、`base` 路径配置

当前 `docs/.vuepress/config.js` 中：

```js
const basePath = process.env.NODE_ENV === 'production' ? '/CCblog/' : '/'
```

若部署到 `https://<username>.github.io/TTblog/`，需改为：

```js
const basePath = process.env.NODE_ENV === 'production' ? '/TTblog/' : '/'
```

或部署到**根域名**（如 `https://<username>.github.io/`，仓库名必须为 `<username>.github.io`）：

```js
const basePath = '/'
```

---

## 本地构建脚本 vs GitHub Actions

### build.sh（手动部署到 CCblog 仓库）

当前 `build.sh` 会：
1. 本地 `npm run build`
2. 拷贝到 `../CCblog/`
3. 在 CCblog 仓库里 commit + push

**适用场景**：分离源码与部署仓库（TTblog 源码，CCblog 部署）。

### GitHub Actions（自动部署）

推送到 `main` 分支自动构建 + 部署到 GitHub Pages。

**适用场景**：简化流程，无需手动运行 `build.sh`。

---

## 如何选择

### 方案 1：仅用 GitHub Actions（推荐）

- **优点**：推送即部署，无需本地 `build.sh`。
- **配置**：启用 Actions 后，确认 `base` 路径与实际部署 URL 一致。
- **CCblog 仓库**：若不再需要可删除相关步骤。

### 方案 2：保留 build.sh 手动部署

- 关闭 GitHub Actions 或只用于预览。
- `build.sh` 继续复制到 `../CCblog/` 并推送。
- **注意**：`CCblog` 仓库也需配置 Pages 或手动同步到部署服务器。

---

## 常见问题

### 1. 部署后页面空白或 404

- 检查 `base` 路径是否与仓库名一致（如 `/TTblog/`）。
- 检查 `docs/.vuepress/dist/` 是否生成了 `index.html`。

### 2. 样式/资源加载失败

- `publicPath` 问题；确保生产环境 `base` 正确。
- CDN 资源（如 `config.js` 里的 React/Vue CDN）需可访问。

### 3. Actions 权限错误

- 仓库 **Settings → Actions → General → Workflow permissions** 选择 **Read and write permissions**。

---

## 验证部署

部署成功后访问：

- 若仓库名为 `TTblog`：`https://<username>.github.io/TTblog/`
- 若是 `<username>.github.io` 仓库：`https://<username>.github.io/`
