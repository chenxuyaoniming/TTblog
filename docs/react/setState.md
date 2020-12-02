### setState解析

1. setState是用来更新组件内部状态的方法，触发组件更新
2. 在 React 钩子函数及合成事件中，它表现为异步；而在 setTimeout、setInterval 等函数中，包括在 DOM 原生事件中，它都表现为同步。

#### 经典题
```js
    class Demo extends React.Component {
        constructor() {
            super();
            this.state = {
                count: 0
            }
        }

        oneClick = () => {
            console.log(this.state.count, 'oneClick:::before')
            this.setState({count: this.state.count + 1})
            console.log(this.state.count, 'oneClick:::after')
        }

        towClick = () => {
            console.log(this.state.count, 'towClick:::before')
            this.setState({count: this.state.count + 1})
            this.setState({count: this.state.count + 1})
            this.setState({count: this.state.count + 1})
            console.log(this.state.count, 'towClick:::after')
        }

        threeClick = () => {
            console.log(this.state.count, 'threeClick:::before')
            setTimeout(() => {
                console.log(this.state.count, 'threeClick:::before::settime')
                this.setState({count: this.state.count + 1})
                console.log(this.state.count, 'threeClick:::after:::settime')
            }, 0);
            console.log(this.state.count, 'threeClick:::after')
        }
        render() {
            return (
                <div>
                    <button onClick={this.oneClick}>click1</button>
                    <button onClick={this.towClick}>click2</button>
                    <button onClick={this.threeClick}>click3</button>
                </div>
            )
        }
    }
```
依次点击这三个按钮，输出结果是什么，并解析
```js
    oneClick()
    // 0  oneClick:::before
    // 0  oneClick:::after

    towClick()
    // 1 towClick:::before
    // 1 towClick:::after

    threeClick()
    // 2 threeClick:::before
    // 2 threeClick:::after
    // 2 threeClick:::before::settime
    // 3 threeClick:::after::settime

    1. setState是异步的，所以第一次点击console拿到的是更新前的值 0 但此时count = 1
    2. 第二次点击 虽然有三个setState 但是react会把多次的setState合并成一次，并取最后一次set的值，console拿到的是之前的count值1
        但此时，count=2
    3. 在settimeout之外的console，遵循上面的条件，在settimeout内部，由于react自身无法控制，所以setState会同步更新，console会拿到更新后的count=3
```

react全局有一个update锁，默认为false，当我们执行setState之前，update的值会变为true，直到当前方法执行完毕，update=false后，才能执行其他更新操作，在这之间，所有的更新操作都会被放入一个待更新队列里。等待执行
