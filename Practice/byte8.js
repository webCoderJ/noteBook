// 多行文本格式化

// 原码补码反码描述

// table、td事件代理

// 给定时间戳或者日期对象，处理为刚刚、1分钟前、1小时、1天等，并保证可拓展性

// 判断内容和header高度，使footer固定，尽可能多的方法

// Event类的实现

// 千分位处理正则和非正则

// 串联bind运行结果

// 格式化多行字符串
let str = `aa \v\r dd 1123
fffn    vv  12fasd fff
ddd ff  1 123`;

let result = str.split("\n").map(row => {
    return row
        .split(" ")
        .map(col => col.trim())
        .filter(v => v);
});

// date transform
// 输入日期或时间戳，转换为刚刚、1分钟前、2分钟前、1天前、2天前

// 区间定义
let min = 60;
let hour = min * 60;
let day = hour * 24;
let mon = day * 30;
let year = day * 365;

let formatMap = {
    ["0-60"]: "刚刚",
    [`${min}-${hour}`]: "分钟前",
    [`${hour}-${day}`]: "小时前",
    [`${day}-${mon}`]: "天前",
    [`${mon}-${year}`]: "月前",
    [`${year}-Infinity`]: "年前"
};

function getSec(date) {
    let ms = date instanceof Date ? date.getTime() : new Date(date).getTime();
    return ~~((Date.now() - ms) / 1000);
}

function transformDate(date) {
    function format(secDiff) {
        for (key of Object.keys(formatMap)) {
            let span = key.split("-");
            let start = Number(span[0]);
            let end = Number(span[1]);
            if (start <= secDiff && secDiff < end) {
                return `${~~(secDiff / start) || ""}${formatMap[key]}`;
            }
        }
    }

    return format(getSec(date));
}

console.log(transformDate(new Date("2019-06-06 16:59:00")));

function transNumTo3(num = 0) {
    num = num.toString();
    let prefix = "";
    let suffix = "";
    // 判断小数
    if (num.includes(".")) {
        prefix = num.split(".")[0];
        suffix = num.split(".")[1];
    } else {
        prefix = num;
    }

    let strArr = prefix.split("");
    for (let i = strArr.length - 3; i > 0; i -= 3) {
        strArr.splice(i, 0, ",");
    }

    return strArr.join("") + (suffix ? "." + suffix : "");
}

function transNumTo3Reg(num = 0){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/, ",")
}
