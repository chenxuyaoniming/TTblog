### 链表高频算法题

---

#### 1. 反转链表（LeetCode 206）

**题目：** 反转单链表。

**思路：** 迭代：前驱指针 + 当前指针，每次把 `current.next` 指向 `prev`；或递归。

**迭代：**

```js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // 保存下一个
    curr.next = prev; // 反转指向
    prev = curr; // 移动 prev
    curr = next; // 移动 curr
  }
  return prev;
}
```

**递归：**

```js
function reverseListRec(head) {
  if (!head || !head.next) return head;

  const newHead = reverseListRec(head.next);
  head.next.next = head; // 反转
  head.next = null; // 断开
  return newHead;
}
```

---

#### 2. 合并两个有序链表（LeetCode 21）

**思路：** 双指针遍历；用哨兵节点简化边界。

```js
function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 || l2; // 连接剩余
  return dummy.next;
}
```

---

#### 3. 环形链表（LeetCode 141）

**题目：** 判断链表是否有环。

**思路：** 快慢指针；快指针每次走 2 步，慢指针 1 步；相遇则有环。

```js
function hasCycle(head) {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

**找环入口（LeetCode 142）：** 相遇后，一指针回起点，两者每次走 1 步，再次相遇即为入口。

---

#### 4. 删除链表倒数第 N 个节点（LeetCode 19）

**思路：** 双指针；快指针先走 `n` 步，然后快慢同步，快到尾时慢指针在目标前一个。

```js
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy,
    slow = dummy;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}
```

---

#### 5. 链表相交（LeetCode 160）

**题目：** 两条链表在某节点相交，返回交点。

**思路：** 双指针；A 走完走 B，B 走完走 A；若相交则在第二轮相遇（消除长度差）。

```js
function getIntersectionNode(headA, headB) {
  let pA = headA,
    pB = headB;

  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }
  return pA; // 相交节点或 null
}
```

---

#### 6. 回文链表（LeetCode 234）

**思路：** 快慢指针找中点 → 反转后半段 → 比较前后两段。

```js
function isPalindrome(head) {
  if (!head || !head.next) return true;

  // 找中点
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 反转后半段
  let prev = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // 比较
  let left = head,
    right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
```

---

#### 7. K 个一组翻转链表（LeetCode 25）

**题目：** 每 K 个节点为一组反转；不足 K 个不反转。

**思路：** 分组递归或迭代；每组反转后连接下一组结果。

```js
function reverseKGroup(head, k) {
  let curr = head,
    count = 0;
  while (curr && count < k) {
    curr = curr.next;
    count++;
  }
  if (count < k) return head; // 不足 k 个

  // 反转前 k 个
  let prev = null;
  curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  head.next = reverseKGroup(curr, k); // 递归处理剩余
  return prev;
}
```

---

#### 8. 链表排序（LeetCode 148）

**题目：** O(n log n) 时间、O(1) 空间排序链表。

**思路：** 归并排序；快慢指针找中点分割 → 递归排序 → 合并。

```js
function sortList(head) {
  if (!head || !head.next) return head;

  // 找中点分割
  let slow = head,
    fast = head,
    prev = null;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = null; // 断开

  const left = sortList(head);
  const right = sortList(slow);
  return merge(left, right);
}

function merge(l1, l2) {
  const dummy = {};
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}
```
