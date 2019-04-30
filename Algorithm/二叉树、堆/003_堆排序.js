function getArr(len = 100) {
    return new Array(len).fill(0).map(_ => ~~(Math.random() * 1000));
}

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
quickSort(getArr(10000000));
console.timeEnd("1-快速排序耗时");

/**
 * 堆排序原理：
 * 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
 * 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
 * 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，
 * 然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。
 * 不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 */

//  交换位置
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 构造大顶堆
 * @param {*} arr
 */
function buildMaxHeap(arr) {
    for (let i = 0; i < ~~(arr.length / 2); i++) {
        heapify(arr, i);
    }
}

/**
 * 堆调整
 * @param {} arr
 * @param {*} i
 */
function heapify(arr, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;
    let len = arr.length;

    /**
     * 判断左右子项
     */
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function heapSort(arr) {
    // 创建大顶堆
    buildMaxHeap(arr);

    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
