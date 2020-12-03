### StackReconciler & FiberReconciler

StackReconciler和FiberReconciler在react框架中的工作是进行组件的挂载、卸载、更新等过程，其中更新过程涉及对 Diff 算法的调用。

#### StackReconciler
栈调和，同层比较，递归遍历节点，得到新旧两个dom的差异，然后批量更新，在更新过程中无法停止，js线程会阻碍UI线程，如果节点过多，js线程运行时间过程，会将页面卡死

#### FiberReconciler
FiberReconciler可以更加细致的控制渲染过程，可随时暂停，重启渲染过程，修改渲染优先级。使页面更加流畅，但是组件渲染频繁暂停重启，会造成生命周期反复执行,且开发者会频繁使用这些生命周期写业务逻辑
- componentWillMount
- mponentWillUpdate
- shouldComponentUpdate
- componentWillReceiveProps
所以在 react16以上，删除了除shouldComponentUpdate之外的三个生命周期，新增了[getDerivedStateFromProps和getSnapshotBeforeUpdate](./getDrived)方法