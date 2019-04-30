let sorts = require("./sort");

function getArr(len = 100) {
    return new Array(len).fill(0).map(_ => ~~(Math.random() * 1000000));
}

let len = 10000000;
sorts.heapSort(getArr(len));
sorts.countingSort(getArr(len), 1000000);
