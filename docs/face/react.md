### react面试题

#### react事件与原生事件有什么不同
react：事件名采用驼峰法，需要显示调用event.preventDefault阻止默认事件，react事件属于合成事件，所有可以进行事件委托的事件都会绑定在document上，且只绑定一次
原生事件：事件名小写，函数返回false即可阻止默认事件
#### react如何区分函数组件和类组件
判断组件的原型链上是否存在React.Component
```js
    let app = () => <div>app</div>

    class App extends React.Component {}

    app.prototype instanceof React.Component
```
#### 父组件如何调用子组件方法
```js
// 函数组件 useRef && useImperativeHandle
const { forwardRef, useRef, useImperativeHandle } = React;
const Child = () => {
    useImperativeHandle(ref, () => ({
        getChild() {
            console.log('child func')
        }
    }))

    return <div>child</div>
}

const Parent = () => {

    const childRef = useRef()

    return <div>
        <Child ref={childRef}/>
    </div>
}

// 类组件

const { Component } = React;

class Parent extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  onClick = () => {
    this.child.current.getAlert();
  };

  render() {
    return (
      <div>
        <Child ref={this.child} />
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

class Child extends Component {
  getAlert() {
    alert('getAlert from Child');
  }

  render() {
    return <h1>Hello</h1>;
  }
}
```
#### 调用setState之后发生了什么  
在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。
#### 为什么虚拟dom 会提高性能?
虚拟dom 相当于在 JS 和真实 dom 中间加了一个缓存，利用 diff 算法避免了没有必要的 dom 操作，从而提高性能
#### diff算法
- tree diff ：只对同层级节点进行对比，忽略跨层级节点
- component diff ：只对相同组件进行对比，组件不同直接替换，
- element diff：对同层级的元素进行对比，key作为唯一标识，会导致插入位置之后的列表全部重新渲染。
这也是为什么渲染列表时为什么要使用唯一的 key
#### hooks为什么不能放在条件语句内
初始化hooks时，会生成一个hooks队列，之后组件更新会按顺序执行队列内的hooks，如果放在条件语句内，会造成组件更新后的hooks顺序与初始化的的hooks队列不一致
#### setState是同步还是异步
- 异步：合成时间，钩子函数
- 同步：settime，原生事件