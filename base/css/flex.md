1. flex-direction: row row-reverse column column-reverse
2. flex-wrap: wrap nowrap  wrap-reverse
3. flex-flow: flex-direction flex-wrap
4. justify-content: flex-start(default) flex-end center space-between space-around
5. align-items: flex-start flex-end center base-line sretch(default)
6. align-content: flex-start flex-end center space-between space-around stretch(default)

#### 项目属性

1. order: 定义项目顺序

2. flex-grow: 定义拉伸比例，默认为0，一行放多个的情况，比其他项目大多少倍

3. flex-shrink: 定义缩小比例，默认为 0，一行放很多个的情况下，不被缩小

4. flex-basis: 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

5. flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

6. align-self: 单个项目不同的对齐方式

   + ```css
     auto(根据align-content设置来排列) | flex-start | flex-end | center | baseline | stretch;
     ```