### Plugins插件
plugin在webpack构建流程里注入钩子来实现对应操作，在webpack运行的期间，会广播许多事件，当符合某个插件的执行的事件被广播后，plugin就会执行，使用webpack传入的api。

#### **plugin实现**
webpack插件是一个具有apply方法的对象，apply方法会被webpack的compiler调用，并且在整个webpack生命周期你生效。

![webpack.hooks]()

```js
// compiler.hooks webpack传入的钩子

// compile.hooks = {
//     shouldEmit,
//     done,
//     beforeRun,
//     run,
//     emit,
//     afterEmit,
//     compilation,
//     thisCompilation,
//     additionalPass
// }

class FileListPlugin {
    // 调用apply方法
    apply(compiler) {
        // 注册file-list的事件，等待时机执行
        compiler.hooks.emit.tapAsync('file-list-plugin', (compilation, callback) => {
            let file = 'file list:\n\n';

            for(let filename in compilation.assets) {
                file += `${filename}\n\n`
            };
            // 给webpack添加一个静态资源，build之后会看见
            compilation.assets['file-list.md'] = {
                source: function() {
                    return file;
                },
                size: function() {
                    return file.length;
                }
            }
            callback();
        })
    }
}

module.exports = FileListPlugin;
```