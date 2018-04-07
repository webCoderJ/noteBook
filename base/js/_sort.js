const _arr = [16, 31, 12, 1, 9, 23, 10]
function arr() {
    return Array.of(..._arr)
}

console.log('es6Sort: ', arr().sort((a, b) => a - b > 0))

function bubbleSort(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
console.log('bubbleSort: ', bubbleSort(arr()))


function quickSort(arr) {
    // console.log(arr)
    if (arr.length <= 1) return arr
    let middleIndex = Math.floor(arr.length / 2)
    let middle = arr.splice(middleIndex, 1)

    let left = []
    let right = []

    arr.forEach(item => {
        if (item < middle[0]) left.push(item)
        else right.push(item)
    })
    return quickSort(left).concat(middle, quickSort(right))
}
console.log('quickSort: ', quickSort(arr()))

