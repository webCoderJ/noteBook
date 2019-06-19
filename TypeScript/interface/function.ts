// 函数表达式
function sum_1(a: number, b: number): number {
    return a + b;
}

// 函数声明
let sum_2: (a: number, b: number) => number = function (a: number, b: number) {
    return a + b;
}

let sum_3: (a: number, b: number) => number = (a: number, b: number) => (a + b);

// interface
interface sumFunc {
    (a: number, b: number): number
}

let sum_4: sumFunc = function (a: number, b: number): number {
    return a + b
}

/**
 * 可选参数
 * 可选参数后面不能跟必选参数
 */
function sum_5(a: number, b?: string, c?: number): any {
    return a + b ? b : 0
}

// 默认参数
function sum_6(a: number, b: string = 'abc'): any {
    return a + b ? b : 0
}

// rest 参数
function sum_7(a: number, ...args: number[] | Array<string>): any {
    return args
}

/**
 * 类型重载
 * 有时候一个函数接受不同类型的参数是，作出不同的处理
 * 输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
 * 注意：TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
 */
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    return Number(x.toString().split('').reverse().join(''))
}
