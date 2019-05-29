1.dom react 原理
2.css 布局
3.js 原型链继承
4.fetch 取消

```js
/**
 * Fetch https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 * 默认不会发送 Cookie， 需要设置 cradential: 'include'
 * fetch 不会根据状态码标记 reject，只会在网络发生错误的时候标记 reject
 * Mixins: 
 * Request(url[, initObj])
 * 
 * Body
 *  blob()
 *  json()
 *  formData()
 * 
 * Headers
 *  append
 * 
 * FormData
 * 
 * Response
 * 
 */
let headers = new Headers({'Content-Type': 'application/json'});
headers.append("Content-length", 100);

let fileField = document.querySelector("input[type='file']");
let formData = new FormData();
formData.append("username", "username");
formData.append("avatar", fileField.files);

let signal = new AbortController().signal;

let JsonParam = JSON.stringify({
    foo: 'abc',
    bar: '123'
})

let init = {
    method: "GET",
    headers,
    body: JsonParam || formData,
    credential: 'include',
    mode: 'cors',
    signal
}

let request = new Request('http://example.com/',init);

fetch(request).then(res => res.json()).then().catch();

// 退出请求
setTimeout(function(){
    signal.abort()
}, 20)
 
```
5. Eventloop `DONE`

6. Instanceof `DONE`

7. redux 基本组成和设计单向数据流

   1. dispatcher
   2. action
   3. reducer
   4. state

8. https 协议的过程

9. https 获取加密密钥的过程

10. http 的方法有哪几种,每种方法的有用途 

11. prototype 继承的实现 

12. 数字千分位处理，正则和非正则都要实现  `DONE`

13. 借用构造继承，几种组合继承方式 

14. 看编程代码说出运行结果：
   Process.nextTick，setImmediate 和 promise.then 的优先级
   Process.nextTick，pronise, setImmediate 的优先级

15. 实现一个 bind 函数 `DONE` 

16. 三个继承方式的优缺点 优化列出代码

17. nodejs 的事件循环 libuv `DONE`

18. BFC `DONE` - 块级格式化上下文

    1. overflow: hidden
    2. position 不为 staic
    3. float 不为 none
    4. display: table-cell、table-caption、inline-block

19. css 实现正方形 div 水平垂直居中

20. koa1 的原理,继承 

21. 最后是一个写代码 处理有依赖的异步任务加重试

22. diff 的原理

23. es6 箭头函数 `DONE`

    1. 没有自己的 this
    2. 不能当做构造函数
    3. 不能作为 genarator
    4. 不能使用 arguments

24. import 和 require 的区别

    |      | Import         | require    |
    | ---- | -------------- | ---------- |
    | 规范 | ES6            | CommonJs   |
    | 输出 | 值的引用       | 值的拷贝   |
    | 加载 | 编译时输出接口 | 运行时加载 |

25. symbol `DONE` 

26. 函数实现正面模板

27. 正方形实现，三角形实现`DONE` 

28. CSS 考了 伪类

29. 实现布局 header,content,footer，上中下布局；当 content 超出窗口可视区，不显示 footer；当 content 没超出可视区时，固定 footer 在最下面

30. 算法:背包问题、闭包问题、函数柯里化

31. 宽是高的一半的垂直居中，里面有字体也要垂直居中类数组

32. promise async settimeout 先后次序

33. event 类 on once 等方法
    37.. ==的隐式转化 38.什么是闭包， 

    1. 最长子序列 
    2. 二叉树中序遍历
    3. .http 握手原理
    4. react 新版本的特性 HOOK 

34. 多空格字符串格式化为数组
    44、bind 函数运行结果 `DONE`
    45、点击 table 的 td 显示 td 内容
    47、固定日期与当前时间格式化处理
    48、上中下三栏布局
    49、实现一个子类实例可以继承父类的所有方法

35. Jsonp 跨域

36. 杭州一面:
    节流函数
    Koa 中间件机制及代码实现
    React Fiber 原理以及为什么 componentWillRecievedProps 会废弃
    给定一个数组，一个期望值，找到数组中两个相加等于期望值 52.深圳前端一面：
    react 生命周期 deepClone 回流重绘 canvas 53.深圳前端一面： 1. 数组去重 2. React Hook 原理 3. 列表 diff 中 key 的作用 4. Vue v-model 原理 5. 场景题：Vue CheckBoxGroup/CheckBox 设计 6. Vue 双向绑定原理 54.成都前端：
    1、换行字符串格式化
    2、屏幕占满和未占满的情况下，使 footer 固定在底部，尽量多种方法。
    3、日期转化为 2 小时前，1 分钟前等
    4、多个 bind 连接后输出的值
    5、原码，补码，反码
    6、事件委托 55.成都前端：
    1，React Hook, Fiber Reconciler ,新的生命周期 getDerivedStateFromPros 为什么是 Static
    2，redux 异步
    3，redux 异步中间件原理
    4，express koa 中间件原理 56.北京前端一面：

37. 宏任务微任务

38. libUV

39. express ctx 中间键代码实现

40. vue 发布订阅和虚拟 dom 代码实现

41. 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数 控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接 使用 fetch 即可

2 
1. 主要是围绕你的项目经历和技术，有一定的深度，主要还是要对项目全面熟悉；还有一个就是函数 柯理化的编码实现
2. 函数柯里化、Web 安全、react 性能优化、react 算法原理 3.上来直接让写一个 autocomplete 组件，可能是想考察业务思考点；
3. 后续的问题主要会接着业务场景问 扣实际场景 不问知识理论；
4. http 网络协议 ；
5. tcp 为什么是可靠的；
6. js 设计模式；
7. solid 原则；
8. 柯里化；
9. curry 函数实现
   https 原理
   webpack 打包原理
   babel 原理
   node 相关基础问题
   我能想到的就这些， 其他的都是项目中，见缝插针问的

SZ-2：
1，一千个棋子，甲先取乙后取，每次最多取七个最少取一个，问是否有一个方案让甲一定赢
2，3×7 的格子，从左上角到右下角，只能往右或者往下，有多少种走法，
3，一个不均匀硬币，如何抛出均匀概率
4，然后有一个生成 0 到 13 随机数的算法，如何用它均匀生成 0 到 9 随机数
5，两千万高考生成绩如何排序
6，用链表表示的大数求和

3： 1.自己做得最有成就的项目 2.自己主动承担并是核心的项目 3.项目深度:比如现场实现 vue 的数据代理等 4.技术广度:什么是微前端等 5.职业发展
