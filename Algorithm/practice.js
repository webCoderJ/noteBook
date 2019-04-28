function getArr(len = 100) {
    return new Array(len).fill(0).map(_ => ~~(Math.random() * 1000));
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

let len = 10000;
// bubbleSort(getArr(len)); // 210ms
// bubbleSort2(getArr(len)); // 200ms
// bubbleSort3(getArr(len)); // 170ms
// bubbleSort4(getArr(len)); // 160ms

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
function insertionSort(array) {
    console.time("插入排序耗时：");
    for (var i = 1; i < array.length; i++) {
        var key = array[i];
        var j = i - 1;
        while (array[j] > key && j >= 0) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    console.timeEnd("插入排序耗时：");
    return array;
}

// 二分插入排序
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

// binaryInsertionSort(getArr(100000));

/**
 * 希尔排序
 * 通过分组插入排序的方式
 *
 * @param {*} arr
 */
function shellSort1(arr) {
    console.time("希尔排序耗时1");
    var len = arr.length,
        cur;
    // 分为5等分
    let gap = 1;
    while (gap < len / 5) {
        // 动态定义间隔序列
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (let i = gap; i < len; i++) {
            cur = arr[i];
            // 准备插入位置
            let j = i;
            while (arr[j - gap] > cur && j >= 0) {
                arr[j - gap] = arr[j];
                j -= gap;
            }
            // 插入
            arr[j] = cur;
        }
    }
    console.timeEnd("希尔排序耗时1");
}

function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = Math.floor(len / 5);
    console.time("希尔排序耗时");
    while (gap < len / 5) {
        // 动态定义间隔序列
        gap = gap * 5 + 1;
    }

    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    console.timeEnd("希尔排序耗时");
    return arr;
}

// shellSort(getArr(1000000));

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

// console.time("归并排序耗时");
// mergeSort(getArr(1000000));
// console.timeEnd("归并排序耗时");

function quickSort(array, left, right) {
    if (left < right) {
        var x = array[right],
            i = left - 1,
            temp;
        for (var j = left; j <= right; j++) {
            if (array[j] <= x) {
                i++;
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        quickSort(array, left, i - 1);
        quickSort(array, i + 1, right);
    }
    return array;
}
console.time("1-快速排序耗时");
quickSort(getArr(1000000));
console.timeEnd("1-快速排序耗时");

function fastSort(arr) {
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

console.time("2-快速排序耗时");
fastSort(getArr(1000000));
console.timeEnd("2-快速排序耗时");
