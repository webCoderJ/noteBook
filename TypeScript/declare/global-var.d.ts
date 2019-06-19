// 全局变量
declare const jquery: (selector: string) => any;

// 全局 function
declare function sum(a: number, b: number): number;

// 全局 class
declare class Cat {
    name: string
    sayMiao(word: string): void
    constructor(name: string)
}

// 全局 enum 枚举类型
declare enum Dictionary {
    Up,
}

/**
 * namespace
 * 它用来表示全局变量是一个对象，包含很多子属性
 * namespace 可以嵌套，用于声明深层次的类型
 **/

declare namespace lodash {
    function throttle(wait: number): void;
    function debounce(wait: number, immediately: boolean): void;
    namespace innerObj {
        function extend(obj: any): void
    }
}

/**
 * interface & type
 * 除全局变量外，有些类型可以直接在声明文件暴露出来，比如 interface, type
 * 这样在别的文件中就可以直接使用这个接口
 */

interface labelValue {
    [propName: string]: string
    label: string
    value?: string
}

/**
 * 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中
 * 我们应该尽可能的减少全局变量或全局类型的数量, 最好将他们放到 namespace
 */

declare namespace types {
    interface labelValue {
        [propName: string]: string
        label: string
        value?: string
    }
}

/**
 * 不过在使用这个接口的时候应该加上空间前缀
 */

// let labelObj: types.labelValue = {
//     label: '域名',
//     value: 'www.domain.com'
// }

