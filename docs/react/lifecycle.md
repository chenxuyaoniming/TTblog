### react生命周期

| 挂载阶段 | 更新阶段 |说明|
| ---- | ---- | ---- |
| constructor | | 组件初始化，继承父类 |
| -- | getDerivedStateFromProps(props, state) | 静态方法，，获取到最新的props和state将props映射为state属性，必须有返回值|
| -- | shouldComponentUpdate(props) | 组件挂在之后，对组件状态进行判定，决定是否更新，默认返回true |
| render | render | 将jsx函数转为fiber节点并返回 |
| -- | getSnapShotBeforeUpdate(preProps, preState) | 获取更新前的props和state,必须有返回值|
| -- | componentDidUpdate(nextProps, nextState, SnapValue) | render方法执行完毕后，可以获取更新前的props和state，以及getSnapBeforeUpdate传入的数据 |
| componentDidUpdate| -- | 组件挂载完成后执行 |
