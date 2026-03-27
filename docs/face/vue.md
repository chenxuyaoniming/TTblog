### Vue 相关面试题

---

#### 1. Vue2 响应式原理？有何局限？

**答：**

- 通过 **`Object.defineProperty`** 遍历 `data` 属性，**getter** 收集依赖（Dep），**setter** 通知更新。
- **局限**：无法监听**新增/删除**属性（需 `Vue.set` / `Vue.delete`）；**数组**通过重写变异方法（`push` 等）部分监听，**下标/长度**直接改无法响应。

---

#### 2. Vue3 为何用 Proxy？优势？

**答：**

- **Proxy** 可拦截整个对象：**增删改查**、嵌套对象懒代理（`reactive` 内部递归）。
- 无需对数组单独 hack；可监听 Map/Set 等；性能与可维护性更好。

---

#### 3. `$nextTick` 作用？原理？

**答：**

- **作用**：在下次 **DOM 更新循环结束后**再执行回调，用于在数据变更后读取真实 DOM。
- **原理**：优先 **微任务**（`Promise`），降级 `MutationObserver`、`setImmediate`、**宏任务** `setTimeout`；与同一轮更新批处理 flush 队列配合。

---

#### 4. `computed` 与 `watch` 区别？

**答：**

| 项 | computed | watch |
| ---- | -------- | ----- |
| 场景 | 依赖多、需**缓存**的派生值 | 异步/开销大/需**旧值**时 |
| 缓存 | 依赖不变不重新计算 | 无缓存概念 |
| 返回 | 必须有返回值 | 副作用逻辑 |

`watch` 可设 `deep`、`immediate`；Vue3 有 `watchEffect` 自动收集依赖。

---

#### 5. 组件间通信方式？

**答：**

- **父子**：`props` / `$emit`；`v-model`（Vue3 多 `modelValue`）；`ref` + `defineExpose`（Vue3）。
- **跨层**：`provide` / `inject`；Vuex/Pinia。
- **兄弟**：共同父级、事件总线（不推荐大规模）、状态库。
- **边界**：`$attrs` / `$listeners`（Vue2），Vue3 合并到 `$attrs`。

---

#### 6. `key` 的作用？用 `index` 做 `key` 有何问题？

**答：**

- **`key`** 是 vnode 的**身份标识**，帮助 diff 识别节点是**复用、移动还是销毁**。
- **列表顺序会变**（插入、排序）时，用 **`index`** 会导致错误复用，产生**错误 DOM 状态**（输入框内容错位、动画异常等）。稳定唯一 id 更佳。

---

#### 7. Vue 生命周期（Vue2 与 Vue3 对照）？

**答（简表）：**

| Vue2 | Vue3 Options | Vue3 Composition |
| ---- | ------------- | ------------------ |
| beforeCreate | beforeCreate | `setup()` 开始 |
| created | created | `setup()` 内同步代码 |
| beforeMount | beforeMount | `onBeforeMount` |
| mounted | mounted | `onMounted` |
| beforeUpdate | beforeUpdate | `onBeforeUpdate` |
| updated | updated | `onUpdated` |
| beforeDestroy | **beforeUnmount** | `onBeforeUnmount` |
| destroyed | **unmounted** | `onUnmounted` |

`setup` 早于 `beforeCreate`，无 `this`。

---

#### 8. 双向绑定与 `v-model` 本质？

**答：**

- Vue2：`v-model` 相当于 `:value` + `@input`（组件上为 `model` 选项自定义）。
- Vue3：默认 **`modelValue` + `update:modelValue`**，支持多个 `v-model` 与修饰符。

本质是 **语法糖 + 事件回写**，不是真正的双向数据流魔法。

---

#### 9. 异步组件与路由懒加载？

**答：**

- `defineAsyncComponent`（Vue3）或异步 `import()` 返回 Promise，配合**分包**减小首屏体积。
- 路由：`component: () => import('./Foo.vue')`，构建工具会打出独立 chunk。

---

#### 10. `keep-alive` 做什么？有哪些钩子？

**答：**

- **缓存**不销毁组件实例，避免重复创建；适合 Tab、列表详情往返。
- 被缓存组件多出 **`activated`** / **`deactivated`**（Vue3 在组合式里用 `onActivated` / `onDeactivated`）。
- 可配 `include` / `exclude` / `max`。
