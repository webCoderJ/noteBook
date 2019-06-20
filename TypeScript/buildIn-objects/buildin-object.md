> TypeScript 内部已经集成了所有浏览器环境，以及它们对应的声明 [>>>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
>
> 但是如果要在 Node 环境使用 TS 的话需要单独引用它的声明文件 `@types/node`，因为 TS 没有集成 Node 环境的对应对象，例如 `WriteStream`

#### ECMAScript内置对象

- Boolean
- Error
- Date
- RegExp

#### DOM & BOM

- Document

- HTMLElement

- Event、MouseEvent

- NodeList

  ```ts
  let body: HTMLElement = document.body
  
  let list: NodeList = document.querySelctorAll('li');
  
  document.addEventListener('click', (e: MouseEvent) => {})
  ```
