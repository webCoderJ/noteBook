Function.prototype._call_ = function(ctx, ...args) {
    // 核心就是改变被调用 fn 的指向
    // 即让 ctx 调用 fn
    // 获取 fn
    ctx = ctx || window;
    ctx.fn = this;
    let result = ctx.fn(...args);
    delete ctx.fn;
    return result;
};

function test(num) {
    console.log(this, num);
}

test._call_({ a: 1 }, 2);

Function.prototype._apply_ = function(ctx, argArr = []) {
    // 核心就是改变被调用 fn 的指向
    // 即让 ctx 调用 fn
    // 获取 fn
    ctx = ctx || window;
    ctx.fn = this;
    let result = ctx.fn(...argArr);
    delete ctx.fn;
    return result;
};

Function.prototype._bind_ = function(ctx) {
    ctx.fn = this;
    return function(...args) {
        ctx.fn(...args);
    };
};

function test2(num) {
    console.log(this, num);
}

test2._bind_({ b: 2 }).bind({c: 1})('...this')

function a(){
    this.a = "aaa";
    console.log(this);
}

a.call({b: 'bbb'})