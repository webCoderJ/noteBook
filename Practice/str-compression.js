// 给定由普通英文字母组成的非空字符串s1，要求将连续出现的字符压缩成字符和该字符连续出现的次数，并返回新的字符串s2。s1字符串的长度不超过100。

// 输入描述:
// 全部由普通英文字符组成的长度不超过100的字符串 。

// 输出描述:
// 由英文字符和数字组成的字符串，其中数字表示它前面的字符在输入字符串中连续出现的次数。

// 示例

// 输入：
// aabccccaaa

// 输出：
// a2bc4a3

// 1. 数组遍历
function compress(str) {
    let strArr = String.prototype.toString.call(str).split("");
    let count = 1,
        result = [];
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === strArr[i + 1]) {
            count++;
        } else {
            result.push(strArr[i]);
            // 只有一个不做标记
            if (count > 1) {
                result.push(count);
            }
            // 重置 count
            count = 1;
        }
    }

    return result.join("");
}

console.log(compress("aaabbbbr"));

// hashMap
// String.fromCharCode(65)
// 'A'.charCodeAt()
