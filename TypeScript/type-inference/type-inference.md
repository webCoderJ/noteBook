#### 类型推论

> 类型的推断
>
> 在有些没有明确之处类型的地方，类型推论回帮助提供类型推导

```ts
let x = 4;
```

上面这种类型推导发生在：

- 变量初始化时
- 设置默认参数值和决定函数返回值时

##### 最佳通用类型

>  需要从几个表达式中推断类型的时候，会使用这些表达式类型来推断出一个最合适的通用类型，如：

```ts
let x = [0, 1, null];
```

> 但有时候定义列表时，无法根据现有的子项类型推导出一个通用类型：

```ts
let zoo = [new Cat(), new Dog(), new Bird()]
```

> 这些自定义类型，ts 无法直接推导，则会推导为联合类型，如下

```ts
let zoo: (Cat | Dog | Bird)[] = [new Cat(), new Dog(), new Bird()]
```

> 所以，以上情况最好手动指定类型 Animal[]



##### 上下文归类

> 按代码上下文的类型与所处位置推导变量类型

```ts
winddow.onscroll = function(UIEvent){
	console.log(UIEvent.button) // <- Error
}

// 以下函数不能直接推导 eg:

const handler = function(uiEvent) {
    console.log(uiEvent.button); //<- OK
}
```

