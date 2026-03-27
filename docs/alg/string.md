### 字符串高频算法题

---

#### 1. 无重复字符的最长子串（LeetCode 3）

**题目：** 找最长无重复字符的连续子串长度。

**思路：** 滑动窗口 + 哈希表；右指针扩展，遇到重复时左指针收缩。

```js
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0,
    maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1; // 收缩窗口
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// 测试
console.log(lengthOfLongestSubstring('abcabcbb')); // 3 (abc)
console.log(lengthOfLongestSubstring('pwwkew')); // 3 (wke)
```

---

#### 2. 最长回文子串（LeetCode 5）

**题目：** 找最长回文子串。

**思路：** 中心扩展；遍历每个位置，以它为中心（奇数长度）或它与下一个为中心（偶数长度）向两边扩展。

```js
function longestPalindrome(s) {
  if (s.length < 2) return s;
  let start = 0,
    maxLen = 1;

  function expandFromCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1; // 回退一步后的长度
  }

  for (let i = 0; i < s.length; i++) {
    const len1 = expandFromCenter(i, i); // 奇数
    const len2 = expandFromCenter(i, i + 1); // 偶数
    const len = Math.max(len1, len2);

    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }
  return s.substr(start, maxLen);
}

// 测试
console.log(longestPalindrome('babad')); // "bab" 或 "aba"
```

---

#### 3. 字符串相加（LeetCode 415）

**题目：** 给定两个非负整数字符串，返回和（不能用 BigInt）。

**思路：** 从低位（末尾）逐位相加，维护进位。

```js
function addStrings(num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1;
  let carry = 0;
  let res = '';

  while (i >= 0 || j >= 0 || carry > 0) {
    const n1 = i >= 0 ? +num1[i] : 0;
    const n2 = j >= 0 ? +num2[j] : 0;
    const sum = n1 + n2 + carry;
    res = (sum % 10) + res;
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  return res;
}

// 测试
console.log(addStrings('123', '456')); // "579"
console.log(addStrings('999', '1')); // "1000"
```

---

#### 4. 有效的括号（LeetCode 20）

**题目：** 判断括号字符串是否有效（成对且顺序正确）。

**思路：** 栈；遇到左括号入栈，遇到右括号检查栈顶是否匹配。

```js
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

// 测试
console.log(isValid('()')); // true
console.log(isValid('([)]')); // false
console.log(isValid('{[]}')); // true
```

---

#### 5. 字符串反转（多种方式）

```js
const str = 'hello';

// 方法1：内置 API
const rev1 = str.split('').reverse().join('');

// 方法2：双指针（数组）
function reverse(s) {
  const arr = s.split('');
  let l = 0,
    r = arr.length - 1;
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++;
    r--;
  }
  return arr.join('');
}

// 方法3：递归
function reverseRec(s) {
  if (s.length <= 1) return s;
  return reverseRec(s.slice(1)) + s[0];
}
```

---

#### 6. 实现 strStr（字符串查找，LeetCode 28）

**题目：** 返回 `needle` 在 `haystack` 中第一次出现的索引。

**思路：** 暴力 **O(m·n)** 或 **KMP** O(m+n)；面试多考暴力与思路。

```js
function strStr(haystack, needle) {
  if (!needle) return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;
    while (j < needle.length && haystack[i + j] === needle[j]) {
      j++;
    }
    if (j === needle.length) return i;
  }
  return -1;
}

// 测试
console.log(strStr('hello', 'll')); // 2
console.log(strStr('aaaaa', 'bba')); // -1
```

---

#### 7. 最长公共前缀（LeetCode 14）

**题目：** 返回字符串数组的最长公共前缀。

**思路：** 以第一个字符串为基准，逐个字符与其他字符串比对。

```js
function longestCommonPrefix(strs) {
  if (!strs.length) return '';

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1); // 缩短
      if (!prefix) return '';
    }
  }
  return prefix;
}

// 测试
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // ""
```

---

#### 8. 字符串压缩（LeetCode 443）

**题目：** `['a','a','b','b','c']` → `['a','2','b','2','c']`（长度 5）。

**思路：** 双指针；记录连续相同字符的起止位置，写入字符与计数。

```js
function compress(chars) {
  let write = 0,
    read = 0;

  while (read < chars.length) {
    const char = chars[read];
    let count = 0;
    while (read < chars.length && chars[read] === char) {
      read++;
      count++;
    }
    chars[write++] = char;
    if (count > 1) {
      for (const c of String(count)) {
        chars[write++] = c;
      }
    }
  }
  return write;
}

// 测试
const arr = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
console.log(compress(arr)); // 6
console.log(arr.slice(0, 6)); // ['a','2','b','2','c','3']
```
