### 自适应多列布局

```html
    <div id="box">
        <div id="left">
        </div>
        <div id="right">
        </div>
    </div>
```

#### flex布局
```css
    /**
    * flex: 1  == flex : 1 1 auto;
      设置right自动缩放占满剩余空间
    **/
    #box {
        display: flex;
        width: 100%;
        flex-wrap: nowrap;
    }
    #left {
        width: 200px;
    }
    #right {
        flex: 1;
    }

```
#### 百分比布局
```css
    /**
        calc自动计算right的宽度
    **/
    #box {
        width: 100%;
    }
    #left {
        float: left;
        width: 200px;
    }
    #right {
        float: left;
        width: calc(100%-200px);
    }
```

#### overflow:hidden(利用bfc特性)
```css
    /**
    * bfc盒子不会和float的元素重叠
    */
    #box {
        width: 100%;
    }
    #left {
        float: left;
        width: 200px;
    }
    #right {
        overflow: hidden;
    }
```