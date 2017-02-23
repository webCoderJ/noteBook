## webWorker

> 1.`webworker`存在的意义
> 由于js引擎只能是单线程，HTML5标准中就出现了一个工作线程
> 它允许开发者编写能够长时间运行而不被用户中断的后台脚本，去执行一些任务

```js
  //script.js

  var worker = new Worker('worker.js');

  worker.onmessage = function(event){

    document.getElementById('result').innderHTML += event.data;

  }

  //worker.js
  function doSomething(){

    var computed = computed();

    postMessage(computed) //向主线程传递消息/数据

  }
```

### 常用API
1. postMessage(data)
2. terminate() //用于终止worker线程，且不能被重启，只能重新 new
3. onmessage
4. onerror //监听worker出错

### 上下文
1. worker与普通js线程共享一个上下文
2. 不能访问window对象，不能操作DOM
3. 拥有独立作用域 `WorkerGlobalScope`
4. 方法
- slef - this
- location - location 属性返回当线程被创建出来的时候与之关联的 WorkerLocation 对象，页面url改变也不会影响
- close 关闭当前线程
- importScript 可以通过传入url在worker中加载库函数，比如underscore.js
- XMLHttpRequest -> 可以发出ajax
  
    
