/**
 * 泛型函数
 */

function compose<T>(a: T, b: T): T[] {
    return [a, b];
}

/**
 * 泛型类型
 */

interface GenericFn<T> {
    <T>(a: T, b: T): T[];
}

// 函数 实现泛型类型并锁定函数类型
let compose2: GenericFn<number> = function<T>(a: T, b: T): T[] {
    return [a, b]
}

// 类泛型
class ABC<T> {
    public name: T
    getName(): T{
        return name
    }
}
