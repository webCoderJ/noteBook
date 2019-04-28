// [参考文章](<https://github.com/xieranmaya/blog/issues/3>)
(() => {
    /**
     * 
     * @param {Promise} p2          // 本次then调用的返回Promise
     * @param {any} x               // 传入then的Fn调用的返回值
     * @param {Function} resolve    // 当前返回的Promise的resolve函数
     * @param {Function} reject     // 当前返回的Promise的reject函数
     */
    const resolvePromise = (p2, x, resolve, reject) => {
        if (p2 === x) {
            throw TypeError('循环引用');
        }
        let called;
        if (x != null && (typeof x === 'function' || typeof x === 'object')) {
            try {
                // 所谓Promise就是 thenable 对象
                let then = x.then;
                if (typeof then === 'function') { // 如果then是一个funcion，那么说明 x 是一个Promise
                    x.then(function (y){
                        if (called) return;
                        called = true;
                        resolvePromise(p2, y, resolve, reject)
                    });

                    then.call(x, y => {
                        if (called) return;
                        called = true;
                        resolvePromise(p2, y, resolve, reject)
                    }, err => {
                        if (called) return;
                        called = true;
                        reject(err);
                    })
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

    let p1 = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(1);
        }, 10000000)
    })

    p1.then(function(res){
        x = new Promise((res, rej) => {
            setTimeout(res(
                new Promise()
                  // Loop
            ), 1000)
        })
        return x
    })

    class Promise {
        constructor(excutor){
            this.status = "pendding";
            this.value = undefined;
            this.reason = undefined;
            this.onResolvedFns = [];
            this.onRejectedFns = [];

            function resolve(value){
                this.status = "resolved";
                this.value = value;
                onResolvedFns.map(fn => {
                    setTimeout(_ => fn(), 0)
                })
            }

            function reject(reason){
                this.status = "rejected";
                this.reason = reason;
                onResolvedFns.map(fn => {
                    setTimeout(_ => fn(), 0)
                })
            }
            
            try {
                excutor && excutor(resolve, reject)
            } catch (err) {
                reject(err)
            }
        }

        static resolve(){
            return new Promise(function (resolve, reject){
                resolve();
            })
        }

        static reject(){
            return new Promise(function (resolve, reject){
                reject();
            })
        }

        static race(promiseArrs = []){
            return (new Promise(function(resolve, reject){
                promiseArrs.map(racingPromise => {
                    racingPromise.then(resolve, reject);
                })
            }))
        }

        static all(promiseArrs = []){
            return (new Promise(function (resolve, reject) {
                let statueChangeCount = 0;
                let resArr = [];
                function statusFn(){
                    statueChangeCount ++;
                    if(statueChangeCount === promiseArrs.length) {
                        resolve();
                    }
                }
                promiseArrs.map(racingPromise => {
                    let x = racingPromise.then(statusFn, statusFn);
                    resArr.push(x);
                })
            }))
        }

        then(onResolved, onRejected){
            let _this = this;
            let promise2;
            onResolved =  typeof onResolved === 'function' ? onResolved : function(value){ return value };
            onRejected =  typeof onRejected === 'function' ? onRejected : function(reason){ return reason };

            // 按标准 解决 x 的各种情况
            // function resolvePromise(promise2, x, resolve, reject) {
            //     var then
            //     var thenCalledOrThrow = false
              
            //     if (promise2 === x) {
            //       return reject(new TypeError('Chaining cycle detected for promise!'))
            //     }
              
            //     if (x instanceof Promise) {
            //       if (x.status === 'pending') { //because x could resolved by a Promise Object
            //         x.then(function(v) {
            //           resolvePromise(promise2, v, resolve, reject)
            //         }, reject)
            //       } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
            //         x.then(resolve, reject)
            //       }
            //       return
            //     }
              
            //     if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
            //       try {
            //         then = x.then //because x.then could be a getter
            //         if (typeof then === 'function') {
            //           then.call(x, function rs(y) {
            //             if (thenCalledOrThrow) return
            //             thenCalledOrThrow = true
            //             return resolvePromise(promise2, y, resolve, reject)
            //           }, function rj(r) {
            //             if (thenCalledOrThrow) return
            //             thenCalledOrThrow = true
            //             return reject(r)
            //           })
            //         } else {
            //           resolve(x)
            //         }
            //       } catch (e) {
            //         if (thenCalledOrThrow) return
            //         thenCalledOrThrow = true
            //         return reject(e)
            //       }
            //     } else {
            //       resolve(x)
            //     }
            // }

            if(_this.status === 'resolved'){
                return (promise2 = new Promise(function(resolve, reject){
                    try {
                        let x = onResolved();
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err)
                    }
                }))
            }

            if(_this.status === 'rejected'){
                return (promise2 = new Promise(function(resolve, reject){
                    try {
                        let x = onResolved();
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err)
                    }
                }))
            }

            if(_this.status === 'pendding'){
                _this.onResolvedFns.push(function(){
                    return (promise2 = new Promise(function(resolve, reject) {
                        try{
                            let x = onResolved();
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(err) {
                            reject(err)
                        }
                    }))
                });
                _this.onRejectedFns.push(function(){
                    return (new Promise(function(resolve, reject) {
                        try{
                            let x = onRejected();
                            resolvePromise(promise2, x, resolve, reject);
                        } catch(err) {
                            reject(err)
                        }
                    }))
                });
            }
        }
    }
})