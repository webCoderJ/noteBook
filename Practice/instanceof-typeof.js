/**
 * 验证left的 __proto__ 是否指向 right 的 prototype
 * @param {*} left
 * @param {*} right
 */
function _instanceof_(left, right) {
    let target = right.prototype;
    try {
        let tmp = left.__proto__;
        while (true) {
            if(tmp === null){
                return false;
            }
            if(tmp === target){
                return true;
            }

            tmp = tmp.__proto__;
        }
    } catch (err) {
        return false;
    }
}

function __instanceof__(left, right) {
    let target = right.prototype;
    try{
        let tmp = left.__proto__;
        while(true) {
            if(tmp === null) {
                return false;
            }
            if(tmp === target) {
                return true
            }

            tmp = tmp.tmp.__proto__;
        }
    } catch (err){
        return false
    }
}
// _instanceof_([], Array);

console.log(_instanceof_([], Array)); // true
console.log(_instanceof_({}, Array)); // false
console.log(_instanceof_("", Array)); // false

// typeof
/**
 * JS 在实现数据存储时采用机器码的后三位标记数据类型
 * 000 - 对象 （null 的机器码全部为0）所以 typeof null === 'object'
 * 010 - 浮点数
 * 100 - 字符串
 * 110 - 布尔
 * 111 - 整数
 */

// 判断内置类型的方法 Object.prototype.soString.call()

Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

// 原型链

let foo = function(){};
a.__proto__ === Function.prototype;
