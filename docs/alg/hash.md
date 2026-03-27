### 哈希表高频题

哈希表（Map/Set）用于 **O(1) 查找、去重、计数**；是多数优化题的核心数据结构。

---

#### 1. 两数之和（见数组题）

用 Map 记录已遍历元素与索引，查 `target - current`。

---

#### 2. 字母异位词分组（LeetCode 49）

**题目：** 把字母异位词（如 `eat`、`tea`）分到同一组。

**思路：** 排序后的字符串作 key，哈希表分组。

```js
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return Array.from(map.values());
}

// 测试
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// [['eat','tea','ate'], ['tan','nat'], ['bat']]
```

---

#### 3. 第一个只出现一次的字符（LeetCode 387）

**思路：** Map 统计频次，再遍历返回第一个计数为 1 的索引。

```js
function firstUniqChar(s) {
  const map = new Map();
  for (const c of s) {
    map.set(c, (map.get(c) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) return i;
  }
  return -1;
}

// 测试
console.log(firstUniqChar('leetcode')); // 0 (l)
console.log(firstUniqChar('loveleetcode')); // 2 (v)
```

---

#### 4. LRU 缓存（LeetCode 146）

**题目：** 实现 `get(key)` 与 `put(key, value)`，容量满时淘汰最久未用。

**思路：** Map 保持插入顺序（ES6+）；`get` 时删除再重新插入（移到最后）。

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val); // 移到最后
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const first = this.cache.keys().next().value;
      this.cache.delete(first);
    }
  }
}

// 测试
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1
lru.put(3, 3); // 淘汰 key 2
console.log(lru.get(2)); // -1
```

---

#### 5. 最长连续序列（LeetCode 128）

**题目：** 找最长连续序列长度（不要求原数组有序）。

**思路：** Set 去重；对每个「连续段起点」（`n-1` 不在 Set 中）向后遍历。

```js
function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;

  for (const num of set) {
    if (!set.has(num - 1)) {
      // 是起点
      let current = num;
      let len = 1;
      while (set.has(current + 1)) {
        current++;
        len++;
      }
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}

// 测试
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4 ([1,2,3,4])
```

---

#### 6. 前 K 个高频元素（LeetCode 347）

**思路：** Map 计数 + 排序/堆（前端简单写法：排序后取前 K）。

```js
function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) {
    map.set(n, (map.get(n) || 0) + 1);
  }

  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((item) => item[0]);
}

// 测试
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
```

---

#### 与前端的联系

- **组件状态映射**：`Map<id, Component>` 快速查找。
- **路由缓存**：`keep-alive` 可类比 LRU。
- **去重与计数**：埋点、事件防重复处理等常用 Set。
