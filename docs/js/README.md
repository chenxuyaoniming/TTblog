# JavaScript

浏览器与 Node 的通用脚本语言：动态类型、基于原型的对象模型、事件驱动与异步 I/O。

#### 变量与作用域

```js
const a = 1;
// instanceof：判断对象原型链上是否出现某构造函数的 prototype

// 提升大致顺序：function 声明 > var > 形参（同层再按书写顺序）
```

| 声明 | 提升 | 块作用域 | 重复声明 |
| ---- | ---- | -------- | -------- |
| `var` | 声明提升，初始化为 `undefined` | 否（函数作用域） | 允许 |
| `let` / `const` | 暂时性死区 | 是 | 不允许 |

#### 类型概览

| 分类 | 内容 |
| ---- | ---- |
| **原始类型** | `number`、`string`、`boolean`、`undefined`、`null`、`symbol`、`bigint` |
| **对象类型** | `Object`、`Array`、`Function`、`Date`、`RegExp`，以及 `Map`、`Set` 等 |

#### 本站笔记方向

| 方向 | 文章示例 |
| ---- | -------- |
| 数据结构 | [数组](/js/array) |
| 原型与继承 | [prototype](/js/prototype)、[class](/js/class) |
| 异步 | [Promise](/js/promise)、[手写 Promise](/js/myPromise) |
| 事件与模式 | [event](/js/event)、[设计模式](/js/designModal) |

#### 学习建议

结合 **MDN** 与 ECMAScript 年度特性；现代开发建议默认使用 **`const` / `let`**、模块化（`import`/`export`）与严格比较（`===`）。
