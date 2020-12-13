### webpack

#### 构建打包工具

基础配置
```js
module.exports = {
    // 文件入口
    entry: string | array | object,

    output: {
        // 打包文件名
        filename: '',
        // 产出路径
        path: '',
        publicPath: '/'
    },
    // 模块-对指定文件进行编译,产出可供浏览器运行的文件格式
    module: {
        // 规则
        rules: [

        ]
    },
    // 插件-在wwebpack各个阶段都有可能执行，用来对项目产出进行配置
    plugins: [

    ],
    // 解析
    resolve: {
        // 别名
        alias: {

        }
    },
    // 本地服务
    devServer: {

    }
}

dev: webpack-dev-server --open --config webpack.js
build: webpack --open webpack.js

```