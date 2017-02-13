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
    promise.then(succCB,errCB,notoifyCB);

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
  }]);

```