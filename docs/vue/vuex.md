### VUEX
vue的全局状态管理器，当多个组件共享数据时，使用vuex会提升开发效率  

组成：
- **state** 数据仓库
- **getters** 从state中派生出新的属性，并可对属性进行过滤
- **actions** 异步获取数据，提交commit（matution方法）
- **matutions** 唯一可以更改state的方法合集，必须是同步方法
- **module** 将一个state,getters,actions,matutions分割成多个仓库,并集合起来，方便维护
- **辅助函数**
    - mapState
    - mapGetters
    - mapMutations
    - mapActions
```js
    const store = new Vuex.Store({
        state: {
            userInfo: {}
        },
        getters: {
            userId: state => state.userInfo.userId
        },
        matutions: {
            // 触发 
            // store.commit('setUserInfo', info)
            // store.commit({type: 'setUserInfo', info: info})
            // 混入后 this.setUserInfo(info)
            setUserInfo(sate, value){
                state.userInfo = value;
            }
        },
        actions: {
            // commit 用来提交matutions更改state
            // 触发 store.dispatch('getUserInfo', data)
            // 使用辅助函数混入methods后：this.getUserInfo(data)
            getUserInfo({commit, state}, data) {
                Promise.reslove()
                    .then(res => {
                        commit('setUserInfo', res)
                    })
            }
        },
        modules: {
            foo: {
                // 注册全局命名空间
                namespaced: true,
                state: {
                    init: 'true', => 'foo.state.init'
                }
                actions: {
                    dosomething: {
                        // 在命名空间模块内设置全局action方法
                        root: true,
                        handler: (namespacedContext, data) => {

                        }
                    }
                }
            }
        }
    })
```
