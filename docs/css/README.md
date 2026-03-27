#### CSS 基础

###### 行内元素与块元素

- **块级元素**：独占一行，可设宽高与上下 margin；常见如 `div`、`p`、`h1`–`h6`、`section`。
- **行内元素**：同排显示，宽高由内容决定，上下 margin 通常无效；常见如 `span`、`a`、`strong`。
- **行内块**：如 `img`、`input`，可设宽高且可与文字同行。

###### 布局与层叠

- **盒模型**：`content` + `padding` + `border` + `margin`；`box-sizing: border-box` 常用于避免宽度计算困扰。
- **定位**：`static` / `relative` / `absolute` / `fixed` / `sticky`，注意包含块与层叠上下文（**z-index** 与 **BFC** 相关）。
- **Flex**：一维布局首选，主轴与交叉轴、`flex-grow/shrink/basis`；详见 [Flex 布局](/css/flex)。
- **BFC**：块级格式化上下文，用于清除浮动、防止 margin 塌陷等；详见 [BFC](/css/bfc)。

###### 进阶方向

响应式（媒体查询、`rem`/`vw`）、动画与过渡、`@layer`（现代浏览器）、预处理器（Sass/Less）按需选用。
