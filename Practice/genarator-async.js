/**
 * http://es6.ruanyifeng.com/#docs/async
 * async 模拟实现
 * async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里
 * 返回 Promise
 * 包装 genarator
 * genarator 返回 done 为 true 的时候才 resolve
 * genarator 自动调用 next
 */

function spawn1(genaratorFn) {
    return new Promise((resolve, reject) => {
        function step(genFn) {
            let gen = genFn();
            let curState;
            try {
                curState = gen.next();
            } catch (error) {
                reject(err);
            }
            if (curState.done) {
                return resolve(curState.value);
            } else {
                Promise.resolve(curState.value).then(
                    val => {
                        step(function() {
                            return gen;
                        });
                    },
                    err => {
                        step(function() {
                            return gen.throw(err);
                        });
                    }
                );
            }
        }
        step(genaratorFn);
    });
}

/**
 * 神仙版自动迭代器
 * 递归 + promise 队列
 * @param {} genFn 
 */
function spawn2(genFn) {
    let gen = genFn();

    return (function next(v) {
        return new Promise((resolve, reject) => {
            try {
                let result = gen.next(v);
                if (result.done) {
                    return resolve(result.value);
                }

                return Promise.resolve(result.value).then(next).then(resolve, reject);
            } catch (error) {
                reject(error);
            }
        });
    })();
}

function _async_(args) {
    return spawn2(function* () {
        yield 1;
        yield 2;
        yield 3;
    });
}

// async - Promise all
async function all(promises) {
    let ps = promises.map(item => item());
    let results = [];
    for (const promise of ps) {
        results.push(await promise);
    }
    return results;
}
