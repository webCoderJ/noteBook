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
function transformDate(date) {
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

    function format(secDiff) {
        let result;
        Object.keys(formatMap).forEach(key => {
            let span = key.split("-");
            let start = Number(span[0]);
            let end = Number(span[1]);
            if (start <= secDiff && secDiff < end) {
                result = `${~~(secDiff / start) || ""}${formatMap[key]}`;
            }
        });
        return result;
    }

    return format(getSec(date));
}

console.log(transformDate(new Date("2019-06-06 16:59:00")));
