let proxyObj = new Proxy({}, {
    /**
     * @param {*} target 目标对象
     * @param {*} key 
     * @param {*} receiver 实例本身 proxyObj
     */
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver)
    }
});

console.log(proxyObj.a);

let a = {a: 1};
console.log(Object.getOwnPropertyDescriptor(a, 'a')); 
//{ value: 1, writable: true, enumerable: true, configurable: true }