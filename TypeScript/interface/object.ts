interface labelvalObj_1 {
    label: string,
    value: string
}

/**
 * 联合类型
 * 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
 */
interface labelvalObj_2 {
    label: string,
    value: string | number
}

// 可选字段
interface labelvalObj_3 {
    label: string,
    value?: string | number
}

/**
 * 任意属性
 * 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 */
interface labelvalObj_4 {
    [propName: string]: any,
    label: string,
    value?: string | number
}

// 只读
interface labelvalObj_5 {
    readonly label: string
}
