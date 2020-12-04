### 泛型

泛型是用来规范一个函数的返回值与其传入参数之间的类型关系，保证了函数的返回值类型是可预测的

```ts
    // 无法预测,返回值可能是any，任何类型
    function identity(arg: number): any {
        return arg;
    }
    // 可预测
    function identity<T>(arg: T):T {
        return arg;
    }
    // 返回的是一个T类型的数组合集
    function identity<T>(arg: T[]):T[] {
        return arg;
    }
```

我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

### 泛型类型
- 泛型函数类型

```ts
    function identity<T>(arg:T): T {
        return arg;
    }

    let myIdentity: <T>(arg: T) => T = identity;

    //or let myIdentity: {<T>(arg: T): T} = identity;

    // 与一般的泛型类型一致，只是有一个类型参数在最前面，像函数声明一样
    // 泛型函数接口
    interface GenericFn {
        <T>(arg: T): T;
    }

    myIdentity: GenericFn = identity;


    // 将泛型类型传入接口，直接指定泛型类型
    interface GenericFnProps<T> {
        <T>(arg: T)： T;
    }

    let myIdentity: GenericFnProps<string> = identity;
```


### 泛型类

```ts
    // 泛型类只是把普通类的类名后面增加<T>
    class Generic<T> {
        count: T;
        getAdd: (arg: T) => T;
    }
```

### 泛型约束

当我们给泛型extends一个接口时，就相当于给了泛型值的一个约束，不再适用于任意类型
```ts
    interface Length {
        length: number
    }

    function identity<T extends Length>(arg: T): T {
        console.log(arg.length)
    }

    identity(1) // error T类型已被约束必须由length属性，所以会报错
    identity([1,2,3]) // 3
```
当我们给定多个参数，让它们之间进行约束
```ts
    function getValue(obj: T, key: U) {
        return obj[key]
    };

    let obj = {a: 1, b: 2};

    getValue(obj, 'a') // 1
    getValue(obj, 'd') // error key的类型被obj约束
```
