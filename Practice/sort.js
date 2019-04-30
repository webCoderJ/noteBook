// 插入排序

function insertionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let cur = arr[i];
        let j = i - 1;
        while(arr[j] > cur && j >= 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = cur;
    }
}

function binaryInsertionSort(arr){
    
}