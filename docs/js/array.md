### 数组
数组常用方法
- **Array.from**
- **Array.pop**
- **Array.push**
- **Array.shift**
- **Array.unshift**
- **Array.prototype.slice**
- **Array.prototype.splice**
- **Array.prototype.map**
- **Array.prototype.foreach**
- **Array.prototype.filter**
- **Array.prototype.some**
- **Array.prototype.find**
- **Array.prototype.every**
- **Array.prototype.sort**
- **Array.prototype.reduce**

#### Array.from( string|array|number|lickArray )
创建一个数组,参数必传，传入number类型返回一个空数组
```js

    const stringArr = Array.from('123')
    // ['1', '2', '3']
    const arrArr = Array.from([1,2,3])
    // [1, 2, 3]
    const numberArr = Array.from(100)
    // []
    const elArr = Array.from(document.querySelector('div'))
    // [div, div, div...]

```
#### Array.pop
从数组尾部删除一个元素,并返回

#### Array.push
从数组尾部插入一个元素

#### Array.shift
从数组头部删除一个元素, 并返回

#### Array.unshift
从数组头部插入一个元素

#### Array.prototype.slice(start, end)
截取数组并返回，不会改变原数组，截取索引位从start开始到end之前（不包含end）,不传参数时会返回一个数组副本,当start > end 返回一个空数组, 当只传入一个参数时，从当前索引开始向后截取完，传入的参数为负数时，从后向前开始截取  
**适合需要保留原数组，并且对数组内的元素进行操作时使用**
```js
    const arr = [1,2,3,4,5,6]
    arr.slice(0,3)
    // [1,2,3]
    arr.slice(4,2)
    // []
    arr.slice()
    // [1,2,3,4,5,6] !== arr  true
    arr.slice(-1)
    // [6]
```

#### Array.prototype.splice(startIndex, number, item1, item2, ...)

截取数组并返回，会改变原数组，从startIndex索引位开始截取，截取number数量的元素，并可在startIndex下插入元素，索引值为负数时，从后向前截取。此时number无效  
**适合直接修改数组的操作**
```js
    const arr = [1,2,3,4,5,6]

    arr.splice(0, 2)
    // arr = [3,4,5,6]
    arr.splice(0, 2, '111')
    // arr = ['111', 3,4,5,6]
    arr.splice(-1, 100)
    // arr = [1,2,3,4,5]
    arr.splice(-1, 1000, '222')
    // arr = [1,2,3,4,5,'222']
```
#### Array.prototype.map(fn(item, index, arr))
遍历数组，不可停止，返回一个新数组。fn需要return新的元素  
**适合对数组元素整体修改的操作**
```js
    const arr = [1,2,3,4,5]

    const arr1 = arr.map(item => {
        return item*2
    })
    // arr1 = [2,4,6,8,10]
```
#### Array.prototype.foreach(fn(item, index, arr))
遍历数组，不可停止，没有返回值.  
**适合全局查找数组元素，找到符合要求的元素**
```js
    const arr = [1,2,3,4,5]
    const arr2 = []
    const arr1 = arr.foreach(item => {
        if (item%2) {
            arr2.push(item)
        }
    })

    // arr1 = undefined
    // arr2 = [1,3,5]
```

#### Array.prototype.filter(fn(item, index, arr))
遍历数组，不可停止，返回一个符合要求的元素合集  
**适合全局查找符合要求的所有元素，不用手动新建数组**
```js
    const arr1 = [1,2,3,4,5]

    const arr2 = arr1.filter(item => item%2)

    // arr2 = [1,3,5]
```

#### Array.prototype.some(fn(item, index, arr))
遍历数组，只要查找到符合要求的元素，返回true，操作停止，否者返回false  
**适合对数组元素进行判断的操作**
```js
    const arr1 = [1,2,3,4,5]
    const flag = arr1.some(item => item%2)
    // flag : true
```
#### Array.prototype.every(fn(item, index, arr))
遍历数组，只有当数组全部元素符合要求是返回true，否者返回false  
**适合判断数组元素是否符合固定格式**
```js
    const arr1 = [1,2,3,4,5]
    const flag = arr1.every(item => item < 10)
    // flag : true
    const flag1 = arr1.every(item => item > 3)
    // flag1： false
```

#### Array.prototype.find(fn(item, index, arr))
遍历数组，找到符合要求的第一个元素，返回，否则返回undefined  
**适合页面初始化时，给默认的参数**
```js
    const arr1 = [1,2,3,4,5]
    const current = arr1.filter(item => item%2)
    // current : 1
```
#### Array.prototype.sort(fn)
遍历数组，对数组元素进行排序,不会改变原数组  
**适合更改数组元素排序**
```js
    const arr = [2,3,1,8,5,10,5,7,13,33,23]
    const newArr = arr.sort((a, b) => a - b)
    // a - b : [1, 2, 3, 5, 5, 7, 8, 10, 13, 23, 33]
    // b - a: [33, 23, 13, 10, 8, 7, 5, 5, 3, 2, 1]
```

#### Array.prototype.reduce(fn(acc, item, index, arr), initAcc)
遍历数组，将数组元素按照fn操作进行拼接，返回acc，初始值必须设置，否则会出现报错  
**适合数组元素拼接**
```js
    const arr = [1,2,3,4,5];

    const count = arr.reduce((acc, item) => {
        return acc + item
    }, 0)

    // count = 15
```