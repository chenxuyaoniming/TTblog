### JavaScript 高频面试题

---

#### 1. 什么是闭包？有什么用途与副作用？

**答：**

- **定义**：函数与其词法环境中的变量组合；内层函数引用外层函数的变量，外层函数执行完毕后，这些变量仍被保留。
- **用途**：模块化、柯里化、防抖节流封装、函数工厂、缓存（memo）。
- **副作用**：若持有大对象或 DOM 引用，容易造成**内存无法释放**，需注意解除引用（置 `null`、避免不必要的闭包层级）。

```js
function createCounter() {
  let n = 0;
  return () => ++n;
}
```

---

#### 2. `var`、`let`、`const` 区别？

**答：**

| 特性 | var | let / const |
| ---- | --- | ------------- |
| 作用域 | 函数作用域 | 块级作用域 |
| 提升 | 提升并初始化为 `undefined` | 存在暂时性死区（TDZ） |
| 重复声明 | 允许 | 不允许 |
| 重新赋值 | 可 | `const` 绑定不可重新赋值（对象属性可改） |

---

#### 3. `typeof` 与 `instanceof` 区别？`typeof null` 为何是 `object`？

**答：**

- **`typeof`**：返回原始类型字符串；对 `null` 历史遗留返回 **`"object"`**（规范缺陷）；`typeof []` 为 `"object"`。
- **`instanceof`**：判断对象原型链上是否存在构造函数的 `prototype`，适合自定义类型与继承链。

判断数组可用 `Array.isArray`；判断空对象需结合 `Object.prototype.toString.call`。

---

#### 4. 手写防抖（debounce）与节流（throttle）？

**答：**

- **防抖**：连续触发只执行最后一次（或第一次），适合输入搜索、resize 结束。
- **节流**：固定时间间隔最多执行一次，适合滚动、mousemove。

```js
function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

可追问：**`leading` / `trailing`**、用 `requestAnimationFrame` 做节流等。

---

#### 5. 浅拷贝与深拷贝？深拷贝如何实现？

**答：**

- **浅拷贝**：只拷贝第一层，嵌套对象仍共享引用。`Object.assign`、`{...obj}`、数组 `slice` 等。
- **深拷贝**：递归拷贝多层；需注意 **循环引用**、**Date/RegExp/Map/Set**、**函数**（通常不拷或特殊处理）。

思路：`WeakMap` 记录已拷贝对象；递归处理数组与普通对象；或 `structuredClone`（现代浏览器）、`JSON.parse(JSON.stringify)`（无法处理函数、`undefined`、循环引用等）。

---

#### 6. 原型与原型链？`new` 做了什么事？

**答：**

- 每个函数有 **`prototype`**，每个对象有 **`__proto__`**（标准访问可用 `Object.getPrototypeOf`）。
- **原型链**：查找属性沿 `__proto__` 向上直到 `Object.prototype` 为 `null`。
- **`new`**：新建空对象、绑定原型、执行构造函数、`this` 指向新对象；若构造函数返回对象则用它，否则返回新对象。

---

#### 7. `call`、`apply`、`bind` 区别？

**答：**

- 均用于指定函数 **`this`**。
- **`call(thisArg, a, b, ...)`** 参数逐个传；**`apply(thisArg, [a,b])`** 第二个为数组。
- **`bind`** 返回新函数，可**柯里化**传参，适合事件监听固定 `this`。

---

#### 8. CommonJS 与 ES Module 区别？

**答（简述）：**

| 项 | CommonJS | ESM |
| ---- | -------- | --- |
| 加载 | 运行时同步（`require`） | 编译时静态结构 |
| 输出 | 值的拷贝（基本类型） |  live binding（引用） |
| `this` | `module.exports` | 严格模式、`undefined`（模块顶层） |
| Tree-shaking | 难 | 易 |

---

#### 9. `for...in` 与 `for...of` 区别？

**答：**

- **`for...in`**：遍历**可枚举属性**（含原型链），适合对象键；数组会得到索引字符串。
- **`for...of`**：遍历 **iterable**（数组、Map、字符串等），得到**值**；对象需先 `Object.keys` 或实现迭代器。

---

#### 10. `map` 与 `forEach` 区别？

**答：**

- **`map`**：返回**新数组**，可链式；未赋值的坑位会保留。
- **`forEach`**：无返回值，**不能 `break`/`continue`**，可用 `return` 跳过当次。
