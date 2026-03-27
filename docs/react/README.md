#### React 框架

核心公式：**UI = f(state)**。React 用虚拟 DOM 与协调（Reconciliation）高效更新界面，函数组件 + Hooks 已是主流写法。

#### 本站笔记索引

| 文章 | 主题 |
| ---- | ---- |
| [setState](/react/setState) | 批量更新与异步表现 |
| [虚拟 DOM](/react/vdom) | VDOM 与 diff 思路 |
| [路由](/react/router) | React Router 使用 |
| [生命周期](/react/lifecycle) | 类组件生命周期 |
| [getDerivedStateFromProps & getSnapshotBeforeUpdate](/react/getDrived) | 新增生命周期 |
| [性能优化](/react/optimize) | memo、列表 key 等 |
| [Fiber 与栈 reconciler](/react/stack&fiber) | 调度与可中断渲染 |
| [Redux](/react/redux) | 单向数据流与中间件 |
| [MobX](/react/mobx) | 响应式状态管理 |
| [合成事件](/react/event) | 事件委托与封装 |

#### 学习建议

先掌握 **组件、props/state、Hooks（useState/useEffect）**，再学 **Context**、路由与状态管理；类组件 API 仍会在老项目与文档中出现，建议了解即可。
