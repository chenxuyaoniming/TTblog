### 状态管理器Mobx

要点：
- **State(状态)**:驱动应用的数据
- **Derivations（衍生）**：数据变动时执行的操作：
    - Computed values（计算值）：衍生出新的值(类似于vue-computed)
    - Reactions（反应）：执行副作用（类似于vue-watch）
- **Actions（动作）**

流程：
MobX 支持单向数据流，也就是动作改变状态，而状态的改变会更新所有受影响的视图。

![](https://cn.mobx.js.org/images/action-state-view.png)

当状态改变时，所有衍生都会进行原子级的自动更新。因此永远不可能观察到中间值。

所有衍生默认都是同步更新。这意味着例如动作可以在改变状态之后直接可以安全地检查计算值。

计算值 是延迟更新的。任何不在使用状态的计算值将不会更新，直到需要它进行副作用（I / O）操作时。 如果视图不再使用，那么它会自动被垃圾回收。

<font color="red">所有的计算值都应该是纯净的。它们不应该用来改变状态</font>

[mobx官方文档](https://cn.mobx.js.org/refguide/api.html)

#### Obserable: 声明状态属性
```js
    @obserable count = 1;
```
#### computed: 计算属性，依赖其他属性，同步改变
```js
  @computed
  countdb() {
    return this.count*2
  }
```
#### action: 改变属性的方法
```js
    @action
    change = () => {
        this.count ++;
    }
```
#### autorun: 自动执行,首次挂在会自动触发
```js
  autorun(() => {
    console.log(store.count)
  })
  /****/
  componentDidMount() {
    reaction((reaction) => {
      console.log(count, 'reaction:::')
      // 执行dispose之后，autorun会被移除
    }
  }
  /****/
```
#### reaction：autorun升级版，增加了可配置项，默认首次挂载不触发
```js
  /**
   * 用法
   * **/
  reaction(
    () => data, 
    (data, reaction) => { sideEffect }, options?)
  /**
   * 例子
   * **/
  componentDidMount() {
    reaction(() => store.count, (count, reaction) => {
      console.log(count, 'reaction:::')
      // 执行dispose之后，reaction会被移除
      reaction.dispose();
    },)
  }
  /****/
// fireImmediately: 布尔值，用来标识效果函数是否在数据函数第一次运行后立即触发。默认值是 false 。
// delay: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。
// equals: 默认值是 comparer.default 。如果指定的话，这个比较器函数被用来比较由 数据 函数产生的前一个值和后一个值。只有比较器函数返回 false 效果 函数才会被调用。此选项如果指定的话，会覆盖 compareStructural 选项。
// name: 字符串，用于在例如像 spy 这样事件中用作此 reaction 的名称。
// onError: 用来处理 reaction 的错误，而不是传播它们。
// scheduler: 设置自定义调度器以决定如何调度 autorun 函数的重新运行
```


mobx项目搭建：
```js
1. create-react-app
// (进入项目根路径)
2. yarn eject 
3. yarn add babel-plugin-transform-decorators-legacy
4. yarn add @babel/plugin-proposal-decorators
5. yarn add mobx@5 mobx-react@6
//(高版本会出现仓库更新视图不更新问题)
"babel": {
    /// package.json下添加以下规则
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ],
    //
  }
```
#### 类组件使用mobx:
```js
// store.js
import {observable, reaction, action, computed, autorun} from 'mobx';

class Store {

    @observable count = 1;

    @computed
    get countdb() {
        return this.count*2
    }

    @action 
    addCount = () => {
        this.count ++;
    }
}

export default new Store();
// --------------------------
// component.js
import {observer} from 'mobx-react';
// 需要在组件之上添加observer修饰符
@observer
class App extends React.Component {

}
```

#### 函数组件使用mobx：

```js
// store.js
import { observable, computed, action, decorate } from 'mobx';
class AppStore {
 // state
  appName = 'app1';
// getter
  get skinWindow() {
      return {
        width: this.appName,
        height: this.appBaseData 
      };
  }
  appNameChange = () => {
      this.appName += 1;
  }
}
// 这是将可观察性装饰器)应用于普通对象或类实例的简便方法。第二个参数是一个属性设置为某些装饰器的对象。
decorate(AppStore, {
    appName: observable,
    skinWindow: computed,
    appNameChange: action
});
export default new AppStore();


// -------------------------------------------


// index.js
import {Provider} from 'mobx-react';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);


// ----------------------------------------


// component.js

import {observer, inject} from 'mobx-react';
import store from './store';

const App = ({store}) => {
  useEffect(() => {
    console.log(store.appName, store)
  }, [])
  return <div>
    function
    <div>{store.appName}</div>
    <button onClick={store.appNameChange}>add</button>
  </div>
}
```

函数组件不能使用修饰符的原因是，修饰符属于侵入式的，可以侵入类组件的初始化以及生命周期，而函数组件没有生命周期等一系列可供侵入的点，所以需要使用高阶组件，将其二次封装，再以参数的形式将store传入。



