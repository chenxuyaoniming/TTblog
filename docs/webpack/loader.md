#### Loader装载

在编译阶段，将目标文件编译成指定格式的文件

```js
    
    ...
    module: {
        rules: [
            {
                // 匹配的文件类型
                test: /\.filetype$/,
                // 使用的loader
                use: {
                    loader: loader.path
                    options: {
                        // loader配置
                    }
                }
            }
        ]
    }
    ...
    /**
     * loader实现
     * loader.js
     * source为目标文件
     * callback为webpack回调方法，将转换后的文件传入到下一步
     * **/

    module.exports = function(source) {
        let result = source.replace(regExp, target);
        this.callback(null, result)
    }

```