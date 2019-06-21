#### 什么是泛型(Generics)?

> 指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型的一种特性

```ts
function createArray<T>(length: number, item: T): Array<T> {
    let array: Array<T> = new Array(length);
    array.fill(item);
    return array;
}
```

-   多个泛型参数

    ```ts
    function swap<T, U>(tuple: [T, U]): [T, U] {
        return [tuple[1], tuple[2]];
    }

    swap([7, "seven"]);
    ```

#### 泛型约束

> 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，这时我们可以对泛型进行约束，只允许这个函数传入那些 包含将要操作属性 的变量

```ts
interface lenObj {
    length: number;
}

function getLen<T extends lenObj>(arg: T): number {
    return lenObj.length;
}
```

此时如果调用 `getLen`的时候，传入的 `arg`不包含 `length`，那么在编译阶段就会报错了

在调用的时候，可以指定它具体的类型为 string 当然，也可以不手动指定，而让类型推论自动推算出来：

> 多个参数也可以互相约束

```ts
function copyFileds<T extends U, U>(target: T, source: U): T{
    // code 
}
```

#### 泛型接口

```ts
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}


let create: CreateArrayFunc<any>;
create = function<T>(length: number, value: T): Array<T>{
    // code
}

// 泛型之类型推导
create(1, 'string')
```

