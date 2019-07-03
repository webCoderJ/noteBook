Date.prototype.format = function(fmt) {
    let o = {
        "M+": this.getMonth(),
        "d+": this.getDay(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds()
    };

    // 处理年
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length));
    }

    for (k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substring((o[k] + "").length));
            // 005 0015
        }
    }

    return fmt
};

console.log(new Date().format("yyyy-MM-dd hhh:mmm:ss::S"));
