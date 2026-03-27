### 二叉树高频算法题

前端框架中虚拟 DOM、组件树都涉及树的遍历与 diff；掌握基础树题对理解源码有帮助。

---

#### 树节点定义

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

---

#### 1. 二叉树的遍历

##### 前序（根-左-右）

```js
function preorder(root) {
  const res = [];
  function traverse(node) {
    if (!node) return;
    res.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return res;
}

// 迭代（栈）
function preorderIter(root) {
  if (!root) return [];
  const stack = [root];
  const res = [];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    if (node.right) stack.push(node.right); // 右先入栈
    if (node.left) stack.push(node.left);
  }
  return res;
}
```

##### 中序（左-根-右）

```js
function inorder(root) {
  const res = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    res.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return res;
}
```

##### 后序（左-右-根）

```js
function postorder(root) {
  const res = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    res.push(node.val);
  }
  traverse(root);
  return res;
}
```

##### 层序（广度优先）

```js
function levelOrder(root) {
  if (!root) return [];
  const queue = [root];
  const res = [];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
```

---

#### 2. 二叉树的最大深度（LeetCode 104）

**思路：** 递归；`max(左子树深度, 右子树深度) + 1`。

```js
function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

---

#### 3. 对称二叉树（LeetCode 101）

**思路：** 递归判断左右子树是否镜像。

```js
function isSymmetric(root) {
  if (!root) return true;

  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right || left.val !== right.val) return false;
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  return isMirror(root.left, root.right);
}
```

---

#### 4. 翻转二叉树（LeetCode 226）

**思路：** 递归交换左右子树。

```js
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}
```

---

#### 5. 二叉树的最近公共祖先（LeetCode 236）

**思路：** 递归；若左右子树分别找到 `p`、`q`，则当前节点是 LCA；若只在一侧则返回该侧结果。

```js
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root; // 分居两侧
  return left || right; // 都在某一侧
}
```

---

#### 6. 路径总和（LeetCode 112）

**题目：** 判断是否存在根到叶路径和为 `targetSum`。

```js
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
}
```

---

#### 7. 二叉搜索树的验证（LeetCode 98）

**思路：** 中序遍历 BST 得到递增序列；或递归传上下界。

```js
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return (
    isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max)
  );
}
```

---

#### 8. 二叉树的右视图（LeetCode 199）

**题目：** 返回从右侧看到的节点值（每层最右）。

**思路：** 层序遍历，取每层最后一个。

```js
function rightSideView(root) {
  if (!root) return [];
  const queue = [root];
  const res = [];

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) res.push(node.val); // 最右
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
}
```

---

#### 与前端的联系

- **虚拟 DOM diff**：树的对比（React Fiber、Vue patch）本质是树的深度优先 + 同层比较。
- **组件树**：递归渲染子组件、Context 向下传递、事件冒泡等都可类比树遍历。
