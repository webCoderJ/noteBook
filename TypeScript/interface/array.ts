// 数组泛型表示法
let array_0: Array<number> = [1, 2, 3]


let array_1: number[] = [1, 2, 3]

let array_3: any[] = [1, "1", { a: 'a' }]

// index 为 number 类型都需要为 string
interface typedArray {
    [index: number]: string, // arr[1]
    [index: string]: string, // obj['propName']
}

// Arrary-like-type
// IArguments NodeList HTMLCollection
function sum() {
    let args: IArguments = arguments;
}