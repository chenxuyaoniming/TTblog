### 原生DOM事件

**事件捕获** -> **目标事件** -> **事件冒泡**
![原生事件](https://s0.lgstatic.com/i/image/M00/78/7B/Ciqc1F_KCc2AH3SuAADAfZ2rEXk066.png)
当事件被触发时，首先会从事件源的最外层开始，一步一步的向下寻找，直到找到目标元素，目标元素执行事件，此时事件将被反弹回去，直到dom最外层，这一过程称之为冒泡

#### DOM事件流的优化方法 ---- 事件委托（事件冒泡）
事件委托：将原本该赋予子节点的事件方法，赋予父节点，在点击子节点时，通过事件的冒泡机制，触发父节点的事件方法，减少内存开销，优化事件注册的复杂性

#### 取消事件冒泡
- e.stopPropagation() (w3c)

#### 取消默认事件
- e.preventDefault()

#### 事件监听 target.addeventListener(type, callback, option = true)
- type: 监听的事件类型 click,scroll,mousemove
- callback: 事件触发时执行的回调
- option：选择事件类型，默认true 为事件捕获， false：事件冒泡