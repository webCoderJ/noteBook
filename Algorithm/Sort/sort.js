function swap(arr, left, right) {
    let tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;
}

/**
 * 冒泡排序 原始版
 * @param {Array} arr
 */
function bubbleSort(arr, opt) {
    console.time("原始冒泡");
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            let left = arr[j];
            let right = arr[j + 1];
            if (left < right) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    console.timeEnd("原始冒泡");
}

/**
 * 原始改良版
 * 增加位置记录
 * @param {*} arr
 */
function bubbleSort2(arr) {
    console.time("原始冒泡-OPT");
    let i = arr.length - 1;
    var tmp, pos;
    while (i > 0) {
        pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                pos = j;
            }
        }
        i = pos;
    }
    console.timeEnd("原始冒泡-OPT");
}

/**
 * 双向冒泡
 * 顺逆向同时进行，向中间靠拢
 * @param {*} arr
 */
function bubbleSort3(arr) {
    var low = 0;
    var high = arr.length - 1; //设置变量的初始值
    console.time("双向冒泡");
    let tmp, j;
    while (low < high) {
        for (j = low; j < high; j++) {
            if (arr[j] < arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
        high--;

        for (j = high; j > low; j--) {
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
        low++;
    }
    console.timeEnd("双向冒泡");
}

/**
 * 双向 + 位置记录
 * @param {} arr
 */
function bubbleSort4(arr) {
    var low = 0;
    var high = arr.length - 1; //设置变量的初始值
    var tmp, j;
    console.time("双向冒泡-OPT");
    while (low < high) {
        let posHigh = high,
            posLow = 0;
        for (j = low; j < high; j++) {
            if (arr[j] < arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                posHigh = j;
            }
        }
        high = posHigh;
        for (j = high; j > low; j--) {
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                posLow = j;
            }
        }
        low = posLow;
    }
    console.timeEnd("双向冒泡-OPT");
}

// 选择排序
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    console.time("选择排序");
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                //寻找最小的数
                minIndex = j; //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd("选择排序");
    return arr;
}

// selectionSort(getArr(len));

// 插入排序
function insertionSort(arr) {
    console.time("插入排序");
    let len = arr.length;
    /**
     * 创建外层指针
     * 指针向数组末尾移动
     * 遍历数组所有元素
     */
    for (let i = 0; i < len; i++) {
        /**
         * 创建指针 j
         * 指针向前移动，每次递减1
         * 遍历数组前置元素
         */
        let j = i - 1;
        // 缓存当前值
        let cur = arr[i];
        for (j; j > 0; j--) {
            // 如果当前值较小, 则覆盖当前值(cur)位置，并把较大值往后移动一位
            if (cur < arr[j]) {
                arr[j + 1] = arr[j];
            }
        }
        // 位置移动结束，说明前置元素没有比当前元素大，即当前元素为最小值
        arr[j] = cur;
    }
    console.timeEnd("插入排序");
}

/**
 * 基本思路
 * 由于一个个往前查询的效率太低，而且前置元素必然是有序序列（因为是从前往后遍历）
 * 那么查找插入位置的之后可以用二分法，加快查询效率
 */
function binaryInsertionSort(arr) {
    console.time("二分插入排序耗时");
    for (var i = 1; i < arr.length; i++) {
        let key = arr[i],
            left = 0,
            mid,
            right = i - 1;

        // 寻找left，即插入位置
        while (left <= right) {
            mid = parseInt((left + right) / 2);
            if (arr[mid] > key) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // 移动位置，为插入点让位
        for (let j = i - 1; j > left; j--) {
            arr[j + 1] = arr[j];
        }

        arr[left] = key;
    }
    console.timeEnd("二分插入排序耗时");
}

/**
 * 希尔排序
 * 可理解为分组插入排序
 *
 * @param {*} arr
 */
function shellSort(arr) {
    console.time("希尔排序耗时");
    let len = arr.length;
    let gap = ~~(len / 5);
    // 动态缩小 gap
    for (gap; gap > 0; gap = ~~(gap / 5)) {
        /**
         * 创建指针 i
         * 往数组末尾移动
         * 遍历当前 gap 所有元素
         */
        let i = gap;
        let cur = arr[gap];
        for (i; i < len; i++) {
            /**
             * 创建指针 j
             * 从当前位置向前移动
             * 用 当前值 与当前gap 下所有前置元素比较并交换位置
             * 进行插排
             */
            let j = i;
            while (arr[j - gap] > cur && j - gap >= 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j - gap] = cur;
        }
    }
    console.timeEnd("希尔排序耗时");
}

function mergeSort(arr) {
    //采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}

function quickSort(array, left, right) {
    function sort(array, left, right) {
        if (left < right) {
            var x = array[right],
                i = left - 1;
            for (j = left; j <= right; j++) {
                if (array[j] <= x) {
                    i++;
                    swap(array, i, j);
                }
            }
            sort(array, left, i - 1);
            sort(array, i + 1, right);
        }
    }

    console.time("快速排序耗时：");
    sort(array, left, right);
    console.timeEnd("快速排序耗时：");
}

function fastSort(arr) {
    function sort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let left = [];
        let right = [];
        let midIdx = Math.floor(arr.length / 2);
        let mid = arr.splice(midIdx, 1)[0];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < mid) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return fastSort(left).concat([mid], fastSort(right));
    }

    console.time("ES6-快速排序耗时：");
    sort(arr);
    console.timeEnd("ES6-快速排序耗时：");
}

function heapSort(arr) {
    /**
     * 堆化
     * @param {*} arr 元数据
     * @param {*} topIndex 数据顶点
     * @param {*} boundary 堆化边界
     */
    function heapify(arr, topIndex, boundary) {
        let largestIndex = topIndex;
        let left = 2 * topIndex + 1;
        let right = 2 * topIndex + 2;
        if (left < boundary && arr[left] > arr[largestIndex]) {
            largestIndex = left;
        }
        if (right < boundary && arr[right] > arr[largestIndex]) {
            largestIndex = right;
        }
        if (topIndex != largestIndex) {
            swap(arr, topIndex, largestIndex);
            heapify(arr, largestIndex, boundary);
        }
    }

    // 创建大根堆
    function buildMaxHeap(arr) {
        for (let i = ~~(arr.length / 2); i > 0; i--) {
            heapify(arr, i, arr.length);
        }
    }

    console.time("堆排序耗时：");
    buildMaxHeap(arr);
    /**
     * 最后一位跟第一位交换位置
     */
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, 0, i);
    }
    console.timeEnd("堆排序耗时：");
}

function countingSort(arr, maxValue) {
    console.time("计数排序耗时：");
    let countArray = new Array(maxValue);
    for (let i = 0; i < arr.length; i++) {
        if (countArray[arr[i]]) {
            countArray[arr[i]] = 0;
        }
        countArray[arr[i]]++;
    }

    let sortIndex = 0;
    for (let j = 0; j < countArray.length; j++) {
        while (countArray[j] > 0) {
            arr[sortIndex] = j;
            countArray[j]--;
        }
    }
    console.timeEnd("计数排序耗时：");
}

module.exports = {
    quickSort,
    fastSort,
    bubbleSort,
    selectionSort,
    insertionSort,
    binaryInsertionSort,
    shellSort,
    mergeSort,
    heapSort,
    countingSort
};
