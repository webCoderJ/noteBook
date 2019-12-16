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
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substring(4 - RegExp.$1.length)
    );
  }

  for (k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ("00" + o[k]).substring((o[k] + "").length)
      );
      // 005 0015 00123
    }
  }

  return fmt;
};

console.log(new Date().format("yyyy-MM-dd hh:mmm:ss::S"));

/**
 * 知识点总结
 * 
 * RegExp
 *  捕获 $1..
 * 
 * 字符串
 *  替换
 *  substring的用法
 *  substring(startIndex, [endIndex])
 *  让一个字符str永远为N位，在前面补N个0
 *  ("00" + str).substring(str.length)
 * 
 * 日期常用方法
 * getMonth() + 1
 */