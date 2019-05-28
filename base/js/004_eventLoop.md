## JS 事件循环

### 为什么JS是单线程

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程可能因为执行的时间导致当前时间点需要给这个DOM节点添加一个背景色，这时浏览器应该以哪个线程为准？

### 任务队列

单线程导致所有的任务必须要一个一个执行，后一个任务要等前一个任务执行完毕才能执行。

由于异步任务需要耗费不必要的等待时间，所以将他放在主线程之外的 `任务队列` 中 

需要等待同步任务执行完毕，才能去执行 任务队列 中的任务

任务队列 中可能会有很多任务，取出执行的顺序取决于这些任务达到可以执行的状态的顺序 这个状态可能会是 setTimeout click ajax

### 事件循环 EventLopp
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

### 定时器

- setTimeout
    - HTML5规定两个setTimeout之间的时间间隔不得低于4毫秒，如果低于这个值，解释器会自动增加(老版本浏览器是10ms)
- setInterval

### Vue中类似的机制

- nextTick
这个方法的回调会在vue-component的视图更新之后执行，有点类似 `setTimeout(fn, 0)`

### NodeJs中的事件循环

Nodejs由于使用的也是Google的V8，所以它也有跟浏览器环境中一样的事件循环机制

搅局者
- process.nextTick()
- setImmediate

process.nextTick() 将执行的代码放在当前主线程执行栈的尾部
setImmediate在当前`任务队列`的尾部(执行栈执行后先取出的部分)添加事件

```javascript
// 将事件放入主线程执行栈尾部
process.nextTick(() => {
    console.log('tick1')
    process.nextTick(() => {
        console.log('tick2')
    })
})

// 将事件放入任务队列
setTimeout(() => {
    console.log('timeout')
}, 0)

// tick1
// tick2
// timeout

// ------
setImmediate(() => {
    console.log('setImmediate1')
    setImmediate(() => {
        console.log('setImmediate2')
    })
})

setTimeout(() => {
    console.log('timeout')
}, 0)

// 嵌套
setImmediate(() => {
    setImmediate(() => {
        console.log('setImmediate1')
        setImmediate(() => {
            console.log('setImmediate2')
        })
    })

    setTimeout(() => {
        console.log('timeout')
    }, 0)
    // setImmediate1 - timeout - setImmediate2
})

/**
 * 这里的运行的结果不是确定唯一的
 * 有可能是 setImmediate1 - timeout - setImmediate2
 * 也有可能是 timeout - setImmediate1 - setImmediate2
 * 但是node官方文档说明setImmediate总是会在timeout之前执行，实际上这种情况只发生在嵌套调用的时候
 *
 * 我们由此得到了process.nextTick和setImmediate的一个重要区别：多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。事实上，这正是Node.js 10.0版添加setImmediate方法的原因，否则像下面这样的递归调用process.nextTick，将会没完没了，主线程根本不会去读取"事件队列"！
 * 
```


