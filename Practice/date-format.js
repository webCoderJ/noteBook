Date.prototype.format = function(fmt) {
    //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            console.log(RegExp.$1, RegExp.$1.length === 1, o[k], RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};

// console.log(new Date().format("yy-MMM-dd hhh:mmm:ss::S"));

Date.prototype._format = function(fmt) {
    let reg2Time = {
        "M+": this.getMonth(),
        "d+": this.getDay(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        S: this.getMilliseconds()
    };

    console.log(reg2Time);

    // 处理年
    if (/(y+)/.test(fmt)) {
        console.log((this.getFullYear() + "").substring(4 - RegExp.$1.length));
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length));
    }

    for (k in reg2Time) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, reg2Time[k].length === 1 ? reg2Time[k] : ("00" + reg2Time[k]).substring(RegExp.$1.length));
        }
    }

    return fmt;
};

console.log(new Date()._format("yyyyy-MMM-dd hhh:mmm:ss::S"));
