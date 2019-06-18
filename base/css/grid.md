[阮一峰 GRID 教程]([http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html))

#### 容器属性

1. display: grid 

2. display: inline-grid;

3. **grid-template-columns、grid-template-rows**
  
    ```js
    // 3 * 3 网格 写法1 - 绝对像素值 + 百分比
    grid-template-colums: 100px 100px 100px;
    grid-template-rows: 33.33% 33.33% 33.33%;
    ```
    
    - **repeat(count, values)**
    
      ```scss
      grid-template-colums: repeat(3, 33.33%);
      grid-template-rows: repeat(2, 100px 20px); 
      //100px-20px-100px-20px
      ```
    
    - **auto-fill、auto-fit** [区别](https://juejin.im/post/5a8c25d66fb9a0634d27b73b)
    
      ```scss
      repeat(auto-fill, 100px) 
      // 在不知道本列有多少单元格的时候可以这样自动填充 100px 的格子
      ```
    
    - **auto** 自动计算
    
      ```scss
      grid-template-columns: 100px auto 100px;
      ```
    
    - **fr** 比例片段
    
      ```scss
      grid-template-columns: 1fr 1fr 2fr; 1:1:2 宽度列
      grid-template-columns: 100px 1fr 2fr; 100px:1:2 宽度列
      ```
    
    - **minmax** 表示长度范围
    
      ```scss
      grid-template-columns: 1fr 1fr minmax(100px, 1fr);
      // 最后一列在100px - 1fr 之间
      ```
    
    - **网格线名称**，网格布局可以指定网格名称，方便日后引用
    
      ```scss
      grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
      grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
      ```
    
4. **间距 grid-row-gap、grid-column-gap、grid-gap**

    - grid-gap: <grid-row-gap> <grid-column-gap>

      只写一个数字表示行列间距相同

5. **grid-template-areas** `todo`

6. **grid-auto-flow** `row|row dense || column|column dense`

    - 指定先从行|列顺序排列子元素
    - dense:`en: 稠密的` 紧密填满，尽量不出现空格

7. **justify-items、align-items、place-items** 表示在单元格中子元素对齐方式

    ```scss
    .container {
      justify-items: start | end | center | stretch;
      align-items: start | end | center | stretch;
    }
    ```

    - place-items： <align-items> <justify-items>

      只写一个表示两者取值一致

8. **justify-content、align-content、place-content** 整个内容区域在容器的位置，类似于 flex 布局中的对应属性

   ```css
   place-content: <align-content> <justify-content>
   ```

9. **grid-auto-columns、grid-auto-rows ** `todo`

#### 项目属性

1. **grid-column-start 、grid-column-end、grid-row-end、grid-row-end**  

   指定项目开始和结束的网格

2. **grid-column、grid-row** 以上属性简写
3. **justify-self 、align-self、place-self**