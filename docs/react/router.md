#### react-router

### react页面跳转方式
-   router-link
-   编程跳转


#### router-link
```jsx
    <router-link to="path">跳转<router-link>
```
点击按钮即可跳转到相应页面

#### 编程跳转

- withRouter
- useHistory


##### withRouter5
```js
// react-router-dom 5.1之下 将组件包裹在withRouter下，withRouter会自动向props内注入history, match, location属性
// 利用history属性进行跳转
import {withRouter} from 'react-router-dom';

class Button extends React.Component {
    constructor(props) {
    }

    toJump = () => {
        this.props.history.push('/data')
    }
    render() {
        return (
            <button onClick={this.toJump}>up</button>
        )
    }
}
export default withRouter(Button)
```

##### useHistory
```js
// react-router-dom 5.1以上，可以使用hooks api
import {useHistory} from 'react-router-dom';

const Button = () => {
    const history = useHistory();

    const toJump = () => {
        history.push('/')
    }
    return <div>
        <button onClick={toJump }>jump</button>
    </div>
}

```