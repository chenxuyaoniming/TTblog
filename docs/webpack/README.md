### Webpack

模块**打包与构建**工具：将多文件依赖图打成浏览器可加载的静态资源，并支持开发服务器、代码分割与优化。

#### 核心概念

| 概念 | 作用 |
| ---- | ---- |
| **entry** | 打包入口，可为单入口或多入口 |
| **output** | 输出文件名、路径、`publicPath`（资源在浏览器中的公共路径） |
| **module.rules** | **Loader**：把各类文件转为 JS 可消费的模块（如 `babel-loader`、`css-loader`） |
| **plugins** | **Plugin**：在编译各阶段介入（提取 CSS、压缩、定义环境变量等） |
| **resolve** | 解析模块路径、`alias`、`extensions` |
| **devServer** | 本地开发、热更新（HMR） |

#### 示例骨架

```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: require('path').resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: { rules: [] },
  plugins: [],
  resolve: { alias: {} },
  devServer: {}
};
```

#### 常用脚本

```bash
# 开发（示例，以实际 webpack 配置名为准）
webpack-dev-server --open --config webpack.config.js
# 生产构建
webpack --config webpack.config.js
```

#### 本站笔记

| 文章 | 主题 |
| ---- | ---- |
| [Loader](/webpack/loader) | 文件转译链 |
| [Plugin](/webpack/plugin) | 插件与生命周期 |

Loader 处理**单个文件**；Plugin 面向**整个构建过程**，二者常配合使用。
