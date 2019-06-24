#### 类型兼容

- 结构类型系统：`是一种只使用其成员来描述类型的方式`，基本规则是，如果`x`要兼容`y`，那么`y`至少具有与`x`相同的属性。

- 名义类型系统：`名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的`

**因为 js 中广泛的使用匿名对象，例如匿名函数，匿名对象，所以TS采用`结构类型系统：`**

```ts
interface Named {
  name: string
}

class Person {
  name: string
}

let p: Named = new Person();
```

以上代码是根据对象的 `结构` 来推断当前类型是否兼容的。


##### 关于可靠性的注意事项

TypeScript的类型系统允许某些在编译阶段无法确认其安全性的操作。当一个类型系统具此属性时，被当做是“不可靠”的。TypeScript允许这种不可靠行为的发生是经过仔细考虑的。通过这篇文章，我们会解释什么时候会发生这种情况和其有利的一面

#### 函数兼容

- 函数传参

  ```ts
  interface Named {
    name: string
  }
  
  let namedFn: (name: Named) => void;
  namedFn({
    name: 'aaa',
    age: 18
  })
  ```

- 函数参数兼容：考虑参数个数和对应类型

  ```ts
  let fn_a: (a: string, b: number) => 0;
  let fn_b: (a: string) => 0;
  
  fn_a = fn_b // OK
  fn_b = fn_a // Error: 因为 fn_a 的参数个数和类型是兼容 fn_a 的，反之则谬
  ```

- 函数返回值兼容：考虑返回值结构，类似 `interface`

  ```ts
  let fn_a = () => ({name: 'Alice'});
  let fn_b = () => {{name: 'Petty', age: 18}}
  
  fn_a = fn_b // OK
  fn_b = fn_a // Error: 因为如果 b 被赋值为 a 后，返回对象结构不匹配，因此报错
  ```
