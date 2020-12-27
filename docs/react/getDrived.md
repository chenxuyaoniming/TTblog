### getDerivedStateFromProps & getSnapshotBeforeUpdate

#### getDerivedStateFromProps
<font color="red">getDerivedStateFromProps</font>: 在组件初始化和更新后执行，用于获取最新的props和state，因为是个静态方法，所以无法获取this，避免开发者在其内部写过多业务，需要返回一个对象式的值，用于更新state。因此16.3去除了componentWillReceiveProps,
在 React 16.4 中，任何因素触发的组件更新流程（包括由 this.setState 和 forceUpdate 触发的更新流程）都会触发 getDerivedStateFromProps；

而在 v 16.3 版本时，只有父组件的更新会触发该生命周期。

```js

    class Demo extends React.Component {
        constructor(){
        
        }
    }
    
    static getDerivedStateFromProps(props, state) {
        // 比较props和state``````
        
        return {...props}
    }
```
#### getSnapshotBeforeUpdate
<font color="red">getSnapshotBeforeUpdate</font>：和componentDidUpdate联动，需要一个返回值，返回值会作为第三个参数给到 componentDidUpdate。它的执行时机是在 render 方法之后，真实 DOM 更新之前。在这个阶段里，我们可以同时获取到更新前的真实 DOM 和更新前后的 state&props 信息。可以认为这个api替代了componentWillUpdate

```js

    class Demo extends React.Component {
        constructor(){
        }
    }
    // 组件更新时调用
    getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log("getSnapshotBeforeUpdate方法执行");
      return "haha";
    }
    // 组件更新后调用
    componentDidUpdate(nextProps, nextState, valueFromSnapshot) {
      console.log("componentDidUpdate方法执行");
      console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
    }
```

#### react 16去除的api
- componentWillMount；

- componentWillUpdate；

- componentWillReceiveProps。

![21bb72521fe815e1141c920c46fc8d7d.png](evernotecid://431011C7-77FA-41A4-AC68-8E0594FD3029/appyinxiangcom/30251234/ENResource/p1)
