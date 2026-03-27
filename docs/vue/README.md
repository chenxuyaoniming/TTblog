#### Vue 框架

Vue 是**渐进式**前端框架：可从模板与单文件组件起步，再按需接入路由、状态管理与构建工具。

#### 核心能力

- **响应式**：Vue 2 基于 `Object.defineProperty`（数组与对象有已知限制）；Vue 3 使用 **Proxy**，支持 Map/Set 等。
- **组件化**：单文件组件（SFC）、`props` / `emit`、插槽与作用域插槽。
- **组合式 API**：`setup`、`ref`、`reactive`、`computed`、`watch` 与逻辑复用（Composables）。
- **生态**：**Vue Router**、**Vuex / Pinia**、Vite 等。

#### 本站笔记索引

| 文章 | 主题 |
| ---- | ---- |
| [组合式 API](/vue/composition) | Composition API 使用与思路 |
| [defineProperty](/vue/defineProperty) | 响应式实现相关 |
| [数组更新检测](/vue/vueArray) | 列表与响应式边界 |
| [Vuex](/vue/vuex) | 集中式状态管理 |

#### 学习建议

若已熟悉 React，可对比：**单向数据流 vs 模板+响应式**、**Hooks vs Composition API**；再选一个中等体量项目练手路由与状态划分。
