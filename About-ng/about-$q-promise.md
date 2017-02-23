## promise

+ promise 是什么？
  1. `promise` 是一种异步处理值(非值)的方法，`promise`是一个对象，代表了函数执行最终一定会返回一个值或者抛出异常。

+ angular中promise 的使用方法
  1. 要使用ng的内置服务$q
  2. code

```js
  
  angular.module('test_$q',[])
  .controller('TestController',['$scope','$q',function($scope,$q){
    //创建一个promise对象
    var deferred = $q.deffer();
    var promise = deferred.promise;

    //定义promise的回调函数
    promise.then(succCB,errCB,notoifyCB).catch().finally();

    catch(errorCallback) //—— promise.then(null, errorCallback) 的快捷方式

    finally() //用于执行一些释放资源或者清理无用对象的工作,不管promise 被拒绝还是解决

    function succCB(result){
      console.log('promise is succ and the return value is' + result);
    }

    function errCB(err){
      console.log('promise is fail and the return err is' + err)
    }

    //用于返回promise状态
    function notoifyCB(status){

    }

    //如何让promise得到成功或者失败的值呢？
    //使用deferred来触发成功或失败事件
    deferred.resolve(result) //触发promise中的成功回调方法，并传回result
    deferred.reject(err)     //触发promise中失败的方法，并传回错误

    $q.all() //用于执行多个异步任务并且多个promise必须执行成功

    var deferA = $q.defer()
    setTimeout(function(){
      deferA.resolve('this is promise A')
    },500)

    var deferB = $q.defer()
    setTimeout(function(){
      deferB.resolve('this is promise B')
    },1500)

    //all可以接收数组或对象
    $q.all({
      promiseA:deferA,
      promiseB:deferB
    })
    .then(function(allRes){
      console.log(allRes.promiseA);
      console.log(allRes.promiseB)
    })
    .catch(function(err){
      console.log(err)
    })

    //Array
    $q.all([
      deferA.promise,
      deferB.promise
    ])
    .then(function(allRes){
      console.log(allRes[0]);
      console.log(allRes[1])
    })
    .catch(function(err){
      console.log(err)
    })

    $q.when(); //将一个可能是value或者then-able promis 包装 为一个$q.promise对象
               //这在你不确定所处理的对象是否是一个promise 时是很有用的,有可能该对象来自于一个不被信任的源头。

  }]);

```