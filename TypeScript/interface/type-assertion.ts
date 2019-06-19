/**
 * 类型断言：在变量前加类型
 * 
 * <T>val || val as T 
 */

// 有时候在使用联合类型的时候，只能访问此联合类型的所有类型共有的方法或属性
// 但是我们确实需要在还不确定类型的时候就访问其中一个类型的方法，比如：

function getLength(strOrNum: string | number): number {
    // return strOrNum.length 直接这样写会报错
    if ((<string>strOrNum).length) {
        return (strOrNum as string).length
    } else {
        return strOrNum.toString().length;
    }
}