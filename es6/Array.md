## Array

- [Array](#array)
    + 使用前提是拥有 Interator 接口的对象 -> Obj Set Symbol
    + 将伪数组转化为真数组
    + 原理:
        + Array.prototype.slice.call(arrayLike);
        + [1,2,3,4].slice(1,3) -> [2,3]
    + 扩展运算符 `...` 也可以将某些数据结构转化为数组
    + 可以把字符串变成数组
    + 

2. Array.of()
    + 将一组值转化为数组，弥补了 `new Array` 的不足, 可以用来代替Array
        + Array.of(3) -> [3]
        + Array(3) -> [ , , ]
        + Array.of() -> []

3. copyWithin(target, start = 0, end = this.length);
    + 修改当前数组，在当前数组内部，将指定位置的成员复制到其他位置
    + target(必须)：从该位置开始替换
    + start(option) 默认为 0，从该位置开始读取数据，负值表示倒数
    + end(option) 默认 为this.length，从该位置结束读取，负值表示倒数，不取该位置

4. find() findIndex filter
    + ['a','b','c'].filter(o => o == a); -> a
    + ['a','b','c'].find(o => o == a); -> a
    + ['a','b','c'].findIndex(o => o == a); -> 0

5. fill(wantFill, startIndex, endIndex)
    + ['a','b','c'].fill(7) -> [7,7,7]
    + Array(5).fill('1') -> [1,1,1,1,1]
    + ['a','b','c'].fill(1,0,1) -> ['1','b','c']

6. entries(), keys(), values()
    + for (let index of ['a', 'b'].keys()) {
        console.log(index);
        }
        0,1

    + for (let elem of ['a', 'b'].values()) {
        console.log(elem);
        }
        a,b

    + for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
        }
        0, a
        1, b

7. includes indexOf
    + [1, 2, NaN].includes(NaN) // true
    + [NaN].indexOf(NaN) -> false 找不到NaN
