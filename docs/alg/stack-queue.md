### 栈与队列高频题

---

#### 1. 用栈实现队列（LeetCode 232）

**思路：** 两个栈；**入栈**到 `stackIn`，**出栈**时若 `stackOut` 为空则把 `stackIn` 全倒入。

```js
class MyQueue {
  constructor() {
    this.stackIn = [];
    this.stackOut = [];
  }

  push(x) {
    this.stackIn.push(x);
  }

  pop() {
    this._transfer();
    return this.stackOut.pop();
  }

  peek() {
    this._transfer();
    return this.stackOut[this.stackOut.length - 1];
  }

  empty() {
    return !this.stackIn.length && !this.stackOut.length;
  }

  _transfer() {
    if (!this.stackOut.length) {
      while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
  }
}
```

---

#### 2. 用队列实现栈（LeetCode 225）

**思路：** 单队列；每次 `push` 后把前面的元素重新入队到队尾，保证队首是栈顶。

```js
class MyStack {
  constructor() {
    this.queue = [];
  }

  push(x) {
    const size = this.queue.length;
    this.queue.push(x);
    for (let i = 0; i < size; i++) {
      this.queue.push(this.queue.shift()); // 轮转
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return !this.queue.length;
  }
}
```

---

#### 3. 最小栈（LeetCode 155）

**题目：** 支持 `push / pop / top / getMin`，getMin **O(1)**。

**思路：** 辅助栈记录当前最小值。

```js
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const min =
      this.minStack.length === 0
        ? val
        : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

---

#### 4. 有效的括号（已在字符串题中，可参考）

**思路：** 栈；左括号入栈，右括号检查栈顶匹配。

---

#### 5. 每日温度（LeetCode 739）

**题目：** 返回每个温度后多少天才会升高（单调栈）。

**思路：** 维护**单调递减栈**（存索引）；当前温度 > 栈顶时弹出并计算间隔。

```js
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const res = Array(n).fill(0);
  const stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      res[idx] = i - idx;
    }
    stack.push(i);
  }
  return res;
}

// 测试
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); 
// [1, 1, 4, 2, 1, 1, 0, 0]
```

---

#### 6. 滑动窗口最大值（LeetCode 239）

**题目：** 大小为 `k` 的滑动窗口，返回每个窗口的最大值。

**思路：** 单调**递减**队列（存索引）；队首是当前窗口最大值，超出窗口范围则移除。

```js
function maxSlidingWindow(nums, k) {
  const deque = [];
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    // 移除超出窗口的索引
    if (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }
    // 维护递减（移除比当前小的）
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);

    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }
  return res;
}

// 测试
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); 
// [3, 3, 5, 5, 6, 7]
```

---

#### 与前端的联系

- **任务队列**：事件循环的宏/微任务队列本质是队列。
- **虚拟列表**：滑动窗口思想，只渲染可视区域。
