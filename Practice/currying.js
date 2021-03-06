/**
 * 为实现多参函数提供了一个递归降解的实现思路
 * 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数
 * 并且返回接受余下的参数而且返回结果的新函数
 * 好处：
 * 1. 参数复用
 * 2. 提前返回
 * 3. 延时执行
 * @param {*} fn
 * @param  {...any} args
 */
function currying(fn, ...args) {
    // 当接受参数的数量大于或等于被 Currying 函数的传入参数数量时，就返回计算结果
    if (args.length >= fn.length) {
        return fn(...args);
    }
    return function(...args2) {
        // 自动柯里化返回函数 返回的是一个函数，也需要被柯里化
        return currying(fn, ...args, ...args2);
    };
}

function curring(fn, ...args) {
    if(args.length > fn.length){
        return fn(...args)
    } else {
        return function(...rest) {
            return curring(fn, ...args, ...rest)
        }
    }
}

function add(x, y, z, a) {
    return x + y + z + a;
}

// 累加器
let accmulator = currying(add, 0);

console.log(accmulator(3)(2));

function curring(fn, ...args) {
    if (args.length <= fn.length) {
        return fn.call(this, ...args);
    } else {
        return function(...restArgs) {
            return curring(fn, ...args, ...restArgs);
        };
    }
}

function curring(fn, ...args) {
    if (fn.length >= args.length) {
        return fn.call(...args);
    }

    return function(...restArgs) {
        // fn(...args, ...restArgs)
        // 如果 restArgs.length + args.length < fn.length
        // 递归一下就可以
        curring(fn, ...args, ...restArgs);
    };
}
