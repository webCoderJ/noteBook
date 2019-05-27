//文章 https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
/**
 * 事件循环
 * 主栈空闲，取出异步队列池的回调函数执行
 * 异步任务也有先后
 * Macro task
 *  setInterval  setTimeout requestAnimationFrame
 * Micro task - 微任务优先被取出执行
 *  Pomise.then
 *  mutationObserver
 * 
 * -----------NODE-----------
 * 
 * Node 事件循环模型 - libuv-based
   ┌───────────────────────────┐
┌─>│           timers          │ timeout                                                                                                                                                                                                                                                                                                              interval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ 调用被延迟到下次循环的 I/O 操作 + 系统级的回调 eg: TCP error
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ 仅在 node 内部被使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │  
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │ setImmediate callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ 被绑定在 'close' 事件上的回调
   └───────────────────────────┘
   process.nextTick() 会在每次进入不同阶段的时候检查被执行

   setTimeout()和setImmediate()
 */ 

let p1 = new Promise((resolve, reject) => {
    setTimeout(_ => {
        console.log("time-out-5000");
        resolve(5000);
    }, 5000);
});
async function block() {
    let result = await p1;
    console.log("TCL: block -> result", result);
}
block();

setTimeout(function() {
    console.log("time-out-0");
}, 0);

setImmediate(function(){
    console.log("setImmediate");
})

process.nextTick(function() {
    console.log("nextTick");
});

new Promise((resolve, reject) => {
    console.log("promise");
    resolve("promise-resolved");
}).then(res => {
    console.log(res);
});
