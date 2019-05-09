/**
 * 旋转数组
 * 将数组中的每一项向后移动 k 个单位
 */

function rotateArr(arr, k) {
    k = k % arr.length;
    for (let i = 0; i < arr.length; i+=k) {
        let tmp = arr[i + k];
        arr[i + k] = arr[i];
        arr[i] = null;
    }
}

function moveStep(arr, k, targetIndex, curIndex){
    let len = arr.length;
    let targetIndex = (i + k) % len;
    let tmp = arr[targetIndex];
    arr[targetIndex] = arr[i];  
}

let arr = [1, 2, 3, 4, 5, 6];
rotateArr(arr, 3);
console.log(arr);
