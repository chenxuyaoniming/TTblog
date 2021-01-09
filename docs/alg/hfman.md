### 霍夫曼压缩算法

**概念** 放弃文本文件的普通保存方式，不再使用7位或者8位二进制数表示每一个字符，而是用较少的比特表示出现频率较大的字符，较多的比特表示出现频率低的字符，以二叉树作为实现方式

**前缀码** 如果所有字符的编码都不会成为其他字符编码的前缀，符合这种规则的编码叫前缀码

普通二叉树实现
```js

class ChildNode {
    constructor(current, left = null, right = null) {
        this.key = current;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor() {
        this.head = null;
    }
    append(value) {
        let child = new ChildNode(value);
        if (this.head) {

            let current = this.head;
            let flag = true;
            while(flag) {
               if (child.key > current.key) {
                    if (current.right) {
                        current = current.right
                    } else {
                        current.right = child;
                        flag = false;
                    }
               } else {
                   if (current.left) {
                       current = current.left
                   } else {
                       current.left = child;
                       flag = false;
                   }
               }
            }
        } else {
            this.head = child
        }
    }
    create(arr) {
        arr.length && arr.forEach(item => this.append(item))
    }
    getMax() {
        let current = this.head;
        let max;
        while(current) {
            max = current.key
            current = current.right;
        }
        return max;
    }
    getMin() {
        let current = this.head;
        let min;
        while(current) {
            min = current.key
            current = current.left;
        }
        return min;
    }
}

let tree = new Tree();

```