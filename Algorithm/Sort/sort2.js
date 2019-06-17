function swap(arr, left, right) {
    let tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;
}

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            let left = arr[j];
            let right = arr[j + 1];
            if (left < right) {
                swap(arr, left, right);
            }
        }
    }
}

function bubbleSortPos(arr) {
    let i = arr.length;
    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j + 1]) {
                swap(arr, j, j + 1);
                pos = j;
            }
        }
        i = pos;
    }
}

function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let cur = arr[i];
        let j = i - 1;
        // 寻找插入位置
        while (j > 0) {
            if (arr[j] > cur) {
                arr[j + 1] = arr[j];
            }
            j--;
        }

        arr[j] = cur;
    }
}

function shellSort(arr) {
    let gap = 5;
    for (; gap > 0; i = Math.floor(gap / 5)) {
        let i = gap;
        for (i = gap; i < arr.length; i++) {
            let j = i;
            
        }
    }
}

function binarySearch(arr, target) {
    let result = null;
    function find(left, right) {
        let pivot = Math.floor((left + right) / 2);
        if (arr[pivot] === target) {
            result = pivot;
            return;
        }
        if (target < arr[pivot]) {
            right = pivot;
        } else {
            left = pivot;
        }
        find(left, right);
    }
    find(0, arr.length - 1);
    return result;
}

console.log(binarySearch([1, 2, 4, 6, 8, 10, 11], 4));
