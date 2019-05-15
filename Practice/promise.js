// [参考文章](<https://github.com/xieranmaya/blog/issues/3>)
() => {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(1);
        }, 10000000);
    });

    p1.then(function(res) {
        x = new Promise((res, rej) => {
            setTimeout(
                res(
                    new Promise()
                    // Loop
                ),
                1000
            );
        });
        return x;
    });

    class Promise {
        constructor(excutor) {
            this.status = "pendding";
            this.value = undefined;
            this.reason = undefined;
            this.onResolvedFns = [];
            this.onRejectedFns = [];

            function resolve(value) {
                this.status = "resolved";
                this.value = value;
                onResolvedFns.map(fn => {
                    setTimeout(_ => fn(), 0);
                });
            }

            function reject(reason) {
                this.status = "rejected";
                this.reason = reason;
                onResolvedFns.map(fn => {
                    setTimeout(_ => fn(), 0);
                });
            }

            try {
                excutor && excutor(resolve, reject);
            } catch (err) {
                reject(err);
            }
        }

        static resolve() {
            return new Promise(function(resolve, reject) {
                resolve();
            });
        }

        static reject() {
            return new Promise(function(resolve, reject) {
                reject();
            });
        }

        static race(promiseArrs = []) {
            return new Promise(function(resolve, reject) {
                promiseArrs.map(racingPromise => {
                    racingPromise.then(resolve, reject);
                });
            });
        }

        static all(promiseArrs = []) {
            return new Promise(function(resolve, reject) {
                let statueChangeCount = 0;
                let resArr = [];
                function statusFn() {
                    statueChangeCount++;
                    if (statueChangeCount === promiseArrs.length) {
                        resolve();
                    }
                }
                promiseArrs.map(racingPromise => {
                    let x = racingPromise.then(statusFn, statusFn);
                    resArr.push(x);
                });
            });
        }

        then(onResolved, onRejected) {
            let _this = this;
            let promise2;
            onResolved =
                typeof onResolved === "function"
                    ? onResolved
                    : function(value) {
                          return value;
                      };
            onRejected =
                typeof onRejected === "function"
                    ? onRejected
                    : function(reason) {
                          return reason;
                      };
            /**
             *
             * @param {Promise} p2          // 本次then调用的返回Promise
             * @param {any} x               // 传入then的Fn调用的返回值
             * @param {Function} resolve    // 当前返回的Promise的resolve函数
             * @param {Function} reject     // 当前返回的Promise的reject函数
             */
            const resolvePromise = (p2, x, resolve, reject) => {
                // let p1 = new Promise();
                // let p2 = p1.then(function(){
                //     return p2;
                // })
                if (p2 === x) {
                    throw TypeError("循环引用");
                }
                let called;
                if (
                    x != null &&
                    (typeof x === "function" || typeof x === "object")
                ) {
                    try {
                        // 所谓Promise就是 thenable 对象
                        let then = x.then;
                        if (typeof then === "function") {
                            // 如果then是一个funcion，那么说明 x 是一个Promise
                            // 递归解决多层promise嵌套返回
                            then.call(x, y => {
                                    if (called) return; // 因为then的执行是异步的，所以只要执行一次
                                    called = true;
                                    resolvePromise(p2, y, resolve, reject);
                                },
                                err => {
                                    if (called) return;
                                    called = true;
                                    reject(err);
                                }
                            );
                        } else {
                            resolve(x);
                        }
                    } catch (e) {
                        if (called) return;
                        called = true;
                        reject(e);
                    }
                } else {
                    resolve(x);
                }
            };

            if (_this.status === "resolved") {
                return (promise2 = new Promise(function(resolve, reject) {
                    try {
                        let x = onResolved();
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }));
            }

            if (_this.status === "rejected") {
                return (promise2 = new Promise(function(resolve, reject) {
                    try {
                        let x = onResolved();
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }));
            }

            if (_this.status === "pendding") {
                _this.onResolvedFns.push(function() {
                    return (promise2 = new Promise(function(resolve, reject) {
                        try {
                            let x = onResolved();
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }));
                });
                _this.onRejectedFns.push(function() {
                    return new Promise(function(resolve, reject) {
                        try {
                            let x = onRejected();
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
            }
        }
    }
};

class Promise {
    constructor(excutor){
        this.status = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.resolvedCbs = [];
        this.rejectedCbs = [];
        
        function resolve(value){
            this.status = "resolved";
            this.value = value;
        }

        function reject(reason){
            this.status = "rejected";
            this.reason = reason;
        }

        try {
            excutor && excutor(resolve, reject)
        } catch (error) {
            reject();
        }
    }

    then(resolvedFn, rejectedFn){
        // then 返回 新Promise实例
        // 判断三个状态
        // 解决 resolvedFn 返回promise的问题

        function resolvePromise(p2, x, resolve, reject){
            if(p2 === x){
                reject("循环")
            }

            let called = false;
            // resolvedFn返回的判断是否为 thenable 对象
            if(x !== null && (typeof x === 'object' || typeof x === 'function')){
                let then = x.then;
                if(typeof then === 'function') {
                    then.call(x, function(res){
                        if(!called) {
                            called = true
                            resolvePromise(p2, res, resolve, reject);
                        } else {
                            return
                        }
                        
                    }, function(err){
                        if(!called) {
                            called = true
                            resolvePromise(p2, res, resolve, reject);
                        } else {
                            return
                        }
                    })
                } else {
                    resolve(x)
                }
            } else {
                resolve(x);
            }
        }

        // 保证传入的是function
        resolvedFn = typeof resolvedFn === 'function' ? resolvedFn : function(){};
        rejectedFn = typeof rejectedFn === 'function' ? rejectedFn : function(){};
        if(this.status === 'resolved'){
            // 将 resolvedFn 作为下次then的接受值
            return (p2 = new Promise((resolve, reject) => {
                let x = resolvedFn();
                // 主要判断x是不是为promise对象
                // 还有多层嵌套的promise
                resolvePromise(p2, x, resolve, reject);
            }));
        }

        if(this.status === 'rejected'){
            // 将 resolvedFn 作为下次then的接受值
            return (p2 = new Promise((resolve, reject) => {
                let x = rejectedFn();
                // 主要判断x是不是为promise对象
                // 还有多层嵌套的promise
                resolvePromise(p2, x, resolve, reject);
            }));
        }

        if(this.status === 'pending'){
            // 需要把回掉函数存起来，在被resolved的时候调用
            this.resolvedCbs.push(function(){
                return new Promise((resolve, reject) => {
                    
                })
            })

            this.rejectedCbs.push(function(){
                setTimeout(() => {
                    rejectedFn();
                }, 0);
            })
        }
    }
}
