(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{387:function(e,r,t){"use strict";t.r(r);var c=t(44),i=Object(c.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h3",{attrs:{id:"stackreconciler-fiberreconciler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#stackreconciler-fiberreconciler"}},[e._v("#")]),e._v(" StackReconciler & FiberReconciler")]),e._v(" "),t("p",[e._v("StackReconciler和FiberReconciler在react框架中的工作是进行组件的挂载、卸载、更新等过程，其中更新过程涉及对 Diff 算法的调用。")]),e._v(" "),t("h4",{attrs:{id:"stackreconciler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#stackreconciler"}},[e._v("#")]),e._v(" StackReconciler")]),e._v(" "),t("p",[e._v("栈调和，同层比较，递归遍历节点，得到新旧两个dom的差异，然后批量更新，在更新过程中无法停止，js线程会阻碍UI线程，如果节点过多，js线程运行时间过程，会将页面卡死")]),e._v(" "),t("h4",{attrs:{id:"fiberreconciler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fiberreconciler"}},[e._v("#")]),e._v(" FiberReconciler")]),e._v(" "),t("p",[e._v("FiberReconciler可以更加细致的控制渲染过程，可随时暂停，重启渲染过程，修改渲染优先级。使页面更加流畅，但是组件渲染频繁暂停重启，会造成生命周期反复执行,且开发者会频繁使用这些生命周期写业务逻辑")]),e._v(" "),t("ul",[t("li",[e._v("componentWillMount")]),e._v(" "),t("li",[e._v("mponentWillUpdate")]),e._v(" "),t("li",[e._v("shouldComponentUpdate")]),e._v(" "),t("li",[e._v("componentWillReceiveProps\n所以在 react16以上，删除了除shouldComponentUpdate之外的三个生命周期，新增了"),t("a",{attrs:{href:"./getDrived"}},[e._v("getDerivedStateFromProps和getSnapshotBeforeUpdate")]),e._v("方法")])])])}),[],!1,null,null,null);r.default=i.exports}}]);