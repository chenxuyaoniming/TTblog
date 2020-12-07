### 链表

链表使用来储存有序的元素合集，与数组的不同点在于，链表内部的元素不是连续放置的，在空间上没有连续性，每个元素包含一个自身的节点属性和一个指向下一个节点的指针
- head -> node1 -> node2
- node{value, nextValue}

#### 单向链表（每个节点保存了一个自身数据和指向下一个节点的指针）
```js
class NodeChild {
    constructor(node) {
        this.node = node;
        this.next = null;
    }
}

class Linked {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    // 增加一个节点
    createNode(node) {
        let currentNode = new NodeChild(node);
        if(this.head) {
            let nextNode = this.head;
            // 遍历链表，找到尾端 == next节点为null
            while (nextNode.next !== null) {
                nextNode = nextNode.next;
            }
            nextNode.next = currentNode;
        } else {
            this.head = currentNode;
        }
        console.log(this.head)
        this.length ++;
    }
    // 查询节点
    findNode(index) {
        if (index < 0 || index > this.length - 1) {
            return;
        }

        let currentNode = this.head;
        while (index > 0) {
            currentNode = currentNode.next;
            index --;
        }
        return currentNode;
    }
    // 删除节点
    deleteNode(index) {
        if (index < 0 || index > this.length - 1) {
            return;
        }
        let currentNode = this.head;
        let lastNode = null;
        if (this.length == 1) {
            this.head = null;
        } else {
            while (index > 0) {
                lastNode = currentNode;
                currentNode = currentNode.next;
                index --;
            }
            // 使删除节点的上一级的next 指向 删除节点的下一级（当前current.next）
            lastNode.next = currentNode.next;
        }
        this.length --;
        console.log(this.head, 'head')
    }
}


```