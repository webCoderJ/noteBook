function uniqueByHash(arr) {
    let hashMap = {};
    arr.map(item => {
        if(hashMap[item] >= 0) {
            hashMap[item]++
        } else {
            hashMap[item] = 1;
        }
    })
    // console.log(hashMap);

    return Object.keys(hashMap);
}

let arr = [1, 2, 3, 4, 5, 1, 2, 3, 1, 8, 7];
let result = uniqueByHash(arr);

console.log(result)

