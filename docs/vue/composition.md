#### vue3.0 - composition api
    
[原文链接链接](https://composition-api.vuejs.org/zh/api.html#setup)

    1.setup
    2.ref
    3.reactive
    4.toRefs
    5.watch
    6.watchEffect
    7.computed
### 引入api

```js
    import { setup, ref, reactive, toRefs, watch, watchEffect, computed} from 'vue'
```
#### 1. setup(props, context)：是composition api的入口，默认接收两个参数,props为父组件传递的props属性，context是从原来 2.x 中 this 选择性地暴露了一些 property，如attrs，emit，slots, 可以返回一个对象或者一个render函数,返回的对象属性，会自动合并到渲染上下文，可直接在模板中使用，

```html

    <template>
        <div>{{name}}</div>
    </template>
```
```js
    <script>
        export default {
            props: {
                name: {
                    type: string,
                    default: ''
                }
            },
            setup(props, context) {
                // props.name
                // context.attrs == this.$attrs(2.x) 父组件传入的子组件未声明的props集合
                // context.slots == this.$slots(2.x) 插槽节点集合
                // context.emit == this.$emit(2.x) 触发父组件的自定义事件
                return {
                    name: 'xiaoming'
                }
                return () => h('div', ['渲染函数'])
            }
        }

    </script>
```
---
#### 2. ref: 声明一个具有响应式的基本类型数据,需要使用 [变量名].value进行数据的修改
```html
    <template>
        <button @click="changeName">{{name}}</button>
    </template>
```
```js
    setup() {

        let name = ref('xiaoming');
        // name = {value: 'xiaoming'};

        function changeName() {
            name.value = 'xiaohua'
        }

        return {
            changeName,
            name
        }
    }
```

#### 3. reactive: 声明一个具有响应式的对象数据

```html
    <template>
        <button @click="changeData">
            name:{{data.name}}
            age: {{data.age}}
        </button>
    </template>
```
```js
    setup() {
        let data = reactive({
            name: 'xiaoming',
            age: 10
        })

        function changeData() {
            data.name = 'xiaohua';
            data.age = 30;
        }

        return {
            data,
            changeData
        }
    }

```
#### 4. toRefs：当使用reactive声明一个对象后，如果进行结构，那么对应属性将会失去响应式，使用toRefs可以将声明的响应式对象的属性ref化，以保证解构之后依然具有响应式
```js

    setup() {
        let data = reactive({
            name: 'xiaoming',
            age: 10
        })
        function changeData() {
            data.name = 'xiaohua';
            data.age = 30;
        }
        let {name, age} = data;
        // 解构后 name和age将失去响应
        let {name, age} = toRefs(data);
        // 将data解构并重新生成新的响应式数据
        // {name: ref('xiaohua'),age: ref(10)}
        return {
            name,
            age,
            changeData
        }
    }
```
#### 5. watch(source, callback(newVal, oldVal, clean(callback)), options): 监听函数，source：监听的数据，支持单个数据或多个，多个需写成数组形式， callback：监听数据变更时执行的回调函数,newVal和oldVal会按照source的形式进行返回,当监听频繁触发时，可通过执行clean方法进行节流，options为监听配置,方法自身返回一个stop方法，可停止该监听事件

```js
    setup() {
        // const option = {
        //     lazy: boolean  ??? ???
        //     回调触发时机
        //     deep: boolean
        //     深度监听
        //     immediate: boolean 默认false
        //     立即执行
        //     flush?: 'pre' | 'post' | 'sync'
        //     pre: 组件更新前执行
        //     post: 组件更新后执行
        //     sync： 和组件更新同步执行
        // }

        let count = ref(0);
        let data = reactive({
            name: 'xiaoming'
        })
        function request() {
            return setTimeout(() => {
                console.log('request')
            }, 300)
        }
        let stop = watch(count, (newVal, oldVal, clean) => {
            console.log(`count::::${newVal}==${oldVal}`)
            clean(() => cleanTimeout(request()))
        })
        watch(() => data.name, (newVal, oldVal) => {
            console.log(`data.name::::${newVal},${oldVal}`)
        })
        let stop = watch([count, () => data.name], (newVal, oldVal, clean) => {
            console.log('dbvalue', newVal, oldVal)
        })
        setInterval(() => {
            count.value ++
        }, 100)
        setTimeout(() => {
            data.name = '12345'
        },2000)
        setTimeout(() => {
            stop()
        }, 3000)

    }
```
#### 6. watchEffect(callback(clean), options): 会在组件创建时执行一次，当其内部的依赖项变更时会重新执行，和watch一样会返回一个stop方法

```js

    setup(props) {
        // options = {
        //     flush?: 'pre' | 'post' | 'sync'
        //     pre: 组件更新前执行
        //     post: 组件更新后执行
        //     sync： 和组件更新同步执行
        // }
        function request() {
            return setTimeout(() => {
                console.log('request')
            }, 300)
        }
        watchEffect((clean) => {
          console.log(props.msg)
          const req = request();
          clean(() => clearTimeout(req))
        })
    }

```
#### 7. computed:计算属性，与2.x区别在于可配置一个可写的计算属性,并且computed本身返回的是一个包装属性
```js
    setup() {
        let count = ref(0);
        // 只读
        let readCount = computed(() => count.value + 2);
        // 可读可写
        let writeCount = computed({
            get() {
                return count.value + 2;
            },
            set(val) {
                count.value = val;
            }
        })
    }

```
### 总结
使用组合式api可以更加细粒度的拆分组件，方便抽离可复用的方法，提升开发效率