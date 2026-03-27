### 数组高频算法题

---

#### 1. 两数之和（LeetCode 1）

**题目：** 给定数组与目标值 `target`，返回两个数的**索引**使其和为 `target`。

**思路：** 哈希表，遍历时查 `target - nums[i]` 是否已存；空间换时间，**O(n)** 一次遍历。

```js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// 测试
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

---

#### 2. 三数之和（LeetCode 15）

**题目：** 返回所有和为 0 的不重复三元组。

**思路：** 排序 + 双指针；固定第一个数 `nums[i]`，剩下两数用首尾指针查找；**去重**：`i` 遇到重复跳过，找到结果后左右指针都跳过重复。

```js
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重

    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        // 跳过重复
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}
```

---

#### 3. 最大子数组和（LeetCode 53 - Kadane 算法）

**题目：** 找连续子数组的最大和。

**思路：** 动态规划；`dp[i]` = 以 `i` 结尾的最大和；若 `dp[i-1] < 0` 则抛弃。

```js
function maxSubArray(nums) {
  let max = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // 要不要加前面
    max = Math.max(max, current);
  }
  return max;
}

// 测试
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 ([4,-1,2,1])
```

---

#### 4. 合并区间（LeetCode 56）

**题目：** 合并所有重叠区间 `[[1,3],[2,6]]` → `[[1,6]]`。

**思路：** 先按区间起点排序；遍历时若当前区间起点 ≤ 上一结果区间终点，则合并（更新终点为较大值）。

```js
function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]); // 合并
    } else {
      res.push(curr);
    }
  }
  return res;
}

// 测试
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); 
// [[1,6],[8,10],[15,18]]
```

---

#### 5. 接雨水（LeetCode 42）

**题目：** 给定高度数组，计算能接多少雨水。

**思路：** 每个位置能接的水 = `min(左侧最高, 右侧最高) - 当前高度`；可预处理左右最大值数组或双指针。

```js
function trap(height) {
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  return water;
}

// 测试
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
```

---

#### 6. 数组去重（多种方式）

```js
const arr = [1, 2, 2, 3, 3, 4];

// 方法1：Set
const unique1 = [...new Set(arr)];

// 方法2：filter + indexOf
const unique2 = arr.filter((item, idx) => arr.indexOf(item) === idx);

// 方法3：reduce
const unique3 = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) acc.push(cur);
  return acc;
}, []);
```

---

#### 7. 旋转数组（LeetCode 189）

**题目：** 将数组向右旋转 `k` 步。

**思路：** 三次反转；或用 `splice` + `unshift`（简单但效率略低）。

```js
function rotate(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// 测试
const arr = [1, 2, 3, 4, 5];
rotate(arr, 2);
console.log(arr); // [4, 5, 1, 2, 3]
```

---

#### 8. 全排列（LeetCode 46）

**题目：** 返回数组的所有排列。

**思路：** 回溯；当前路径 + 剩余元素递归。

```js
function permute(nums) {
  const res = [];

  function backtrack(path, used) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);
      used[i] = true;
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([], []);
  return res;
}

// 测试
console.log(permute([1, 2, 3])); 
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
