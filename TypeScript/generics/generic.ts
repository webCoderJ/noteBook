/**
 * 泛型函数
 */

function compose<T>(a: T, b: T): T[] {
    return [a, b];
}

/**
 * 泛型字面量 literal
 * { <T>(a: T): T[] }
 */

let literalType: { <T>(a: T): T[] };
literalType = function <T>(a: T): T[] {
    return [a]
}

/**
 * 泛型函数表达式 expr
 * <T>(arg: T) => T[];
 */

let exprType: <T>(a: T) => T[];
exprType = <T>(a: T) => [a];
let exprType2: <T>(a: T) => Array<T> = <T>(a: T) => [a];






/**
 * 泛型接口
 * eg: Array<number>
 */

// 用于泛型函数的接口，参数前 有 泛型参数
interface GenericFn<T> {
    <T>(a: T, b: T): T[];
}

// 用于可锁定泛型函数接口，参数前 无 泛型参数
interface typedFn<T> {
    (a: T, b: T): T[];
}

// 函数 实现泛型类型并锁定函数类型
let compose2: GenericFn<number> = function <T>(a: T, b: T): T[] {
    return [a, b]
}

let compose3: typedFn<number> = function (a, b): Array<number> {
    return [a, b]
}

compose2<string>('string', 'string')
// 报错：因为这里已经被锁定类型，所以不能再传入类型参数
// compose3<string>('string', 'string')
// 报错：因为这里已经被 typedFn<number> 锁定为 number
// compose3('string', 'string');
// 只能这样调用
compose3(1, 2)





/**
 * 泛型类
 * 跟接口类似
 * 只能用于实例部分(可被子例继承的部分)的类型检查
 */
class typedPerson<T> {
    public name: T;
    sayHi: (word: T) => void;
}

let person1: typedPerson<number> = new typedPerson<number>();
