### 排序

- **冒泡排序：** 两层循环，比较相邻的两个元素，大（小）的放右边，小（大）的放左边，每一层确定一个值
![](https://img.jbzj.com/file_images/article/202002/2020224111119698.gif?2020124111138)  

- **选择排序：** 两层循环，每次循环对剩余元素进行比较，保存一个最大值索引，按照需要放在头部或者尾部
![](https://img.jbzj.com/file_images/article/202002/2020224110851094.gif?202012411916)  

- **插入排序：** 拿出一个元素并将其之前的元素视为已排序元素，进行大小比较。
![](https://img.jbzj.com/file_images/article/202002/2020224110705854.gif?20201241180)  

- **希尔排序：** 希尔

- **并归排序：** 并归排序
![](https://img.jbzj.com/file_images/article/202002/2020224110944138.gif?2020124111010)

- **快速排序：**
![](https://img.jbzj.com/file_images/article/202002/2020224111039941.gif?2020124111059)

- **堆排序：**
- **计数排序：**
- **桶排序：**
- **基数排序：**

#### 冒泡排序：
```js
    function sort(arr) {
        for(let i = 0; i < arr.length - 1; i++) {
            for(let j = 0; j < arr.length - i; j++) {
                if(arr[j] >= arr[j+1]) {
                    let sun = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = sun;
                }
            }
        }
    }
    // 两层，第一层保证循环次数，第二层进行比较，比较的长度随外层增加而减小（因为每次都把值放到了最右边，下次遍历时就不需要再次比较了）
```
#### 选择排序：
```js
    function sort(arr) {
        for(let i = 0; i < arr.length; i++ ) {
            let maxIndex = i;
            for(let j = i; j < arr.length; j++) {
                if(arr[j] >= arr[maxIndex]) {
                    maxIndex = j;
                }
            }
            let max = arr[i];
            arr[i] = arr[maxIndex];
            arr[maxIndex] = max;
        }
        console.log(arr, 'arr');
    }
    // 两层比较，每次循环设定一个默认最大index进行比较，内循环一次，得到一个最大值，放到最后
```
#### 插入排序：
```js
    function sort(arr) {
        let preIndex;
        let current;
        for(let i=1; i<arr.length; i++) {
            // 拿一个元素
            current = arr[i];
            // 将此元素后面的元素视为已排序元素，并依次进行比较
            preIndex = i - 1;
            // 当已排序的元素大于当前未排序的元素时，替换两者位置
            while(preIndex >=0 && arr[preIndex] > current) {
                arr[preIndex+1] = arr[preIndex]
                nexIndex --;
            }
            // 进循环：以上都不成立时，继任为排序完成将当前元素放置在停止的索引位+1（因为循环里每次都会-1）上
            // 不进循环体：说明当前未排序元素大于之前排序元素的最大值，perindex+1 = i;还是放在原来的位置
            arr[preIndex + 1] = current;
        }
    }
    // 
```