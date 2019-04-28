function interval(fn, time) {
    let timer = setTimeout(function() {
        fn && fn();
        clearTimeout(timer);
        interval(fn, time);
    }, time);
}

let time = 0;
interval(function(){
    console.log("interval - " + ++time);
}, 100);