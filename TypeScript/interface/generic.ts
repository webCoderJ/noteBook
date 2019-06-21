/**
 * 泛型接口
 */

interface createArrayFn {
    <T>(length: number, substr: T): T[]
}

let createArr: createArrayFn = function <T>(length: number, substr: T): T[] {
    let result: T[] = new Array(length).fill(substr);
    return result;
}

createArr(5, 'fuck');

console.log(createArr(5, 'fuck'))
