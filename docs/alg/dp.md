### 动态规划高频题

动态规划（DP）核心：**最优子结构** + **状态转移方程**；前端面试多考简单 DP（爬楼梯、买卖股票等）。

---

#### 1. 爬楼梯（LeetCode 70）

**题目：** 每次可爬 1 或 2 阶，到 `n` 阶有多少种方法？

**思路：** `dp[i] = dp[i-1] + dp[i-2]`（到 i 阶 = 从 i-1 爬 1 步 + 从 i-2 爬 2 步）。

```js
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1,
    prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// 测试
console.log(climbStairs(5)); // 8
```

---

#### 2. 买卖股票的最佳时机（LeetCode 121）

**题目：** 一次买卖，求最大利润。

**思路：** 遍历时维护**最低买入价**，计算当前卖出的利润。

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}

// 测试
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (1买6卖)
```

---

#### 3. 打家劫舍（LeetCode 198）

**题目：** 不能偷相邻房屋，求最大金额。

**思路：** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`（偷或不偷第 i 家）。

```js
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0,
    prev1 = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// 测试
console.log(rob([2, 7, 9, 3, 1])); // 12 (2+9+1)
```

---

#### 4. 最长递增子序列（LeetCode 300）

**题目：** 找最长严格递增子序列长度（不要求连续）。

**思路：** `dp[i]` = 以 `i` 结尾的最长递增长度；枚举 `j < i`，若 `nums[j] < nums[i]` 则可接上。

```js
function lengthOfLIS(nums) {
  if (!nums.length) return 0;
  const dp = Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

// 测试
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4 ([2,3,7,101])
```

---

#### 5. 零钱兑换（LeetCode 322）

**题目：** 凑成金额 `amount` 需要的最少硬币数（无限供应）。

**思路：** `dp[i] = min(dp[i - coin] + 1)`（枚举所有面额）。

```js
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 测试
console.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)
```

---

#### 6. 最长公共子序列（LeetCode 1143）

**题目：** 两字符串的最长公共子序列长度（不连续）。

**思路：** 二维 DP；`dp[i][j]` = `s1[i-1]` 与 `s2[j-1]` 的 LCS。

```js
function longestCommonSubsequence(text1, text2) {
  const m = text1.length,
    n = text2.length;
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// 测试
console.log(longestCommonSubsequence('abcde', 'ace')); // 3 (ace)
```

---

#### 7. 编辑距离（LeetCode 72）

**题目：** 最少操作数（插入、删除、替换）使 `s1` 变 `s2`。

**思路：** 二维 DP；`dp[i][j]` = `s1[0..i-1]` 到 `s2[0..j-1]` 的最小距离。

```js
function minDistance(word1, word2) {
  const m = word1.length,
    n = word2.length;
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],     // 删除
          dp[i][j - 1],     // 插入
          dp[i - 1][j - 1]  // 替换
        ) + 1;
      }
    }
  }
  return dp[m][n];
}
```

---

#### 8. 背包问题（0-1 背包）

**题目：** 容量 `W` 背包，`n` 个物品（重量 `w[i]`、价值 `v[i]`），每个最多拿一次，求最大价值。

**思路：** `dp[i][j]` = 前 `i` 个物品，容量 `j` 时的最大价值。

```js
function knapsack(W, weights, values) {
  const n = weights.length;
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      if (j < weights[i - 1]) {
        dp[i][j] = dp[i - 1][j]; // 装不下
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j], // 不拿
          dp[i - 1][j - weights[i - 1]] + values[i - 1] // 拿
        );
      }
    }
  }
  return dp[n][W];
}

// 测试
console.log(knapsack(10, [2, 3, 5, 7], [1, 5, 2, 4])); // 9
```

---

#### DP 解题步骤总结

1. **定义状态**：`dp[i]` 或 `dp[i][j]` 含义。
2. **初始化**：边界值（如 `dp[0]`）。
3. **状态转移**：从子问题推导当前问题。
4. **优化空间**：一维 DP 或滚动数组（如爬楼梯只需两变量）。
