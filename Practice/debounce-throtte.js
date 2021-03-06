/**
 * 防抖 - 简单版
 * 在系列操作延时之后执行函数
 * @param {*} fn
 */
function debounce(fn, delay) {
    let timer;

    return function(...args) {
        if (timer) return clearTimeout(timer);
        timer = setTimeout(function() {
            fn.call(this, ...args);
        }, delay);
    };
}

/**
 * Immediately
 * @param {*} fn
 * @param {*} delay
 * @param {*} immediately 立即执行回调函数
 */
function debounce_2(fn, delay, immediately) {
    let timer, args, context;

    const later = _ =>
        setTimeout(_ => {
            fn.apply(context, args);
            timer = null;
        }, delay);

    return function(...arg) {
        args = arg;
        context = this;

        if (!timer) {
            timer = later();

            if (immediately) {
                fn.apply(context, arg);
            }
        } else {
            clearTimeout(timer);
            timer = later();
        }
    };
}

/**
 * 节流
 * @param {Function} fn
 */
function throttle(fn, wait) {
    let lastTs, now, timer, context, result;
    // 存储上次执行函数时间
    // 每次执行的时候检查上次执行时间距离本次执行时间的间隔是否大于 wait
    // 如果 >= 则执行 fn ，记录本次执行时间，如果计时器存在，一并清除
    // 如果 < 则新建一个 timer
    // 为了防止 timer 重复生成，每次新建 timer 之前需要把之前的清除掉
    return function(...params) {
        // 记录 context
        context = this;
        // 本次执行时刻
        now = +new Date();
        // 初始化 上次时间
        if(!lastTs) {
            lastTs = now;
        }
        let remaning = wait - (now - lastTs)
        if(remaning <= 0){
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            result = fn.apply(context, params);
            lastTs = now;
        } else if(!timer) {
            timer = setTimeout(() => {
                result = fn.apply(context, params);
                lastTs = +new Date();
            }, remaning)
        }
    };
}


function debounce_3(fn, wait, immediately) {
    let context, timer, args

    const later = () => setTimeout(function(){
        timer = null;
        fn.apply(context, args);
    }, wait)

    return function(...args){
        context = this;
        if(!timer){
            if(immediately){
                timer = later();
                fn.apply(context, args);
            }
        } else {
            clearTimeout(timer);
            timer = later();
        }
    }
}

function throttle3(fn, wait){
    let lastTs, now, remaing, context, result, timer;


    return function(...args){
        now = +new Date();
        if(!lastTs){
            lastTs = now;
            context = this;
        }

        // 计算距离下次执行时间
        remaing = wait - (now - lastTs);

        if(remaing <= 0){
            clearTimeout(timer);
            result = fn.apply(context, args);
            lastTs = +new Date();
        } else {
            clearTimeout(timer);
            setTimeout(function(){
                result = fn.apply(context, args);
                lastTs = +new Date();
            }, remaing)
        }

        return result;
    }
}

function throttle2(fn, wait){
    let lastTs, now, timer, cxt;

    return function(...args){
        cxt = this;
        now = +new Date();

        let remaing = wait - (now - lastTs);

        if(remaing <= 0){
            if(timer){
                clearTimeout(timer);
            }
            fn.call(cxt, ...args);
            lastTs = +new Date();
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.call(cxt, ...args);
                lastTs = +new Date();
            }, remaing);
        }
    }
}