#### 流程图

######  [Typora教程](<http://support.typora.io/Draw-Diagrams-With-Markdown/>)

`flow` 流程图的语法大体分为两部分：

- 定义流程图元素；

  ```
  tag=>type: content:>url
  ```

  - tag 是流程图中的标签，在第二段连接元素时会用到。名称可以任意，一般为流程的英文缩写和数字的组合。
  - type 用来确定标签的类型，`=>`后面表示类型。由于标签的名称可以任意指定，所以要依赖type来确定标签的类型，标签有6种类型：
    - `start` 开始
    - `operation` 操作、执行说明
    - `inputoutput` IO
    - `subroutine` 子程序
    - `condition` 确认？
    - `end` 结束
  - content 是流程图文本框中的描述内容，`: `后面表示内容，中英文均可。特别注意，冒号与文本之间一定要有个`空格`
  - url是一个连接，与框框中的文本相绑定，`:>`后面就是对应的 url 链接，点击文本时可以通过链接跳转到 url 指定页面

- 后面部分用来连接流程图元素，指定流程图的执行走向。

  - 使用 `->` 来连接两个元素
  - 对于`condition`类型，有`yes`和`no`两个分支，如示例中的`cond(yes)`和`cond(no)`
  - 每个元素可以制定分支走向，默认`向下`，也可以用`right`指向右边，如示例中`sub1(right)`。


```flow
# 定义元素
st=>start: Start
e=>end: End
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes or No?
io=>inputoutput: catch something...
# 连接流程
st->op1->cond
cond(yes)->io->e
cond(no)->sub1(right)->op1
```



- 美人鱼 mermaid 流程图

  ```mermaid
  graph LR
  A[Round edge] -->B(Round edge)
      B --> C{Decision}
      C -->|One| D[Result one]
      C -->|Two| E[Result two]
  ```

