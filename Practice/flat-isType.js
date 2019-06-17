function flat(arr) {
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return pre.concat(...flat(cur));
        } else {
            return pre.concat(cur);
        }
    }, []);
}

console.log(flat([1, [2, 3, [5, 6]], 3]));

// 判断对象数据类型
let isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);

let isArray = isType('Array');

console.log(isArray([]));
