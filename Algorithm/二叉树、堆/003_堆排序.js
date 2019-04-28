function getArr(len = 100) {
    return new Array(len).fill(0).map(_ => ~~(Math.random() * 1000));
}

function heapSort(arr) {
    console.time("堆排序耗时");
    // 建堆
    let heapSize = arr.length;
    let deepth = Math.floor((heapSize - 1) / 2);
    // 从堆的最后一层开始
    for (let i = deepth; i >= 0; i--) {
        heapify(arr, i, heapSize);
    }

    let tmp;
    for (let j = heapSize - 1; j >= 1; j--) {
        tmp = arr[0];
        arr[0] = arr[j];
        arr[j] = [tmp];
        heapify(arr, 0, --heapSize);
    }

    console.timeEnd("堆排序耗时");
}

function heapify(arr, dpth, heapSize) {
    let leftIndex = 2 * dpth + 1; // 当前节点的左子树
    let rightIndex = 2 * dpth + 2; // 当前节点的右子树
    let maxIndex = dpth; // 当前最大值index
    let tmp;

    if (leftIndex < heapSize && arr[leftIndex] > arr[maxIndex]) {
        maxIndex = leftIndex;
    }

    if (rightIndex < heapSize && arr[rightIndex] > arr[maxIndex]) {
        maxIndex = rightIndex;
    }

    if (maxIndex != dpth) {
        tmp = arr[dpth];
        arr[dpth] = arr[maxIndex];
        arr[maxIndex] = tmp;
        heapify(arr, maxIndex, heapSize);
    }
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

heapSort(getArr(10000000));
