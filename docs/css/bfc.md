### BFC - 块级格式化上下文

BFC概括：可以在心中记住这么一个概念———所谓的BFC就是css布局的一个概念，是一块区域，一个环境。

#### 触发BFC的行为
- 根元素
- overflow的属性不为visible
- float的值不为none
- display的值为inline-block, table-cell, table-caption
- position的值为absolute或者fixed

#### BFC内部元素排列规则
- 内部box会垂直排列
- 垂直方向上的两个元素的margin会产生重叠
- 内部元素的左边会紧贴父元素的左边
- BFC的区域不会与float元素重叠
- BFC是页面上的一个隔离容器

#### BFC的作用
- 自适应两栏布局
- 阻止元素被浮动元素覆盖
- 可以包含浮动元素