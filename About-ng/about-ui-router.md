## about ui router

```html
index.html

<div ui-view="viewName"> </div> ui-view后面指定模板容器的名字
```


```js
angular.module('app', ['ui.router'])
.config(['$stateProvider','$urlRouterProvider'],function($stateProvider,$urlRouterProvider){
  $stateProvider.state(stateName1,stateConfig1)
  var stataName1 = 'index';
  var stateConfig1 = { //状态配置信息

    url:'/index:/params', //路由对应的锚点地址

    onEnter,      //进入路由时候的钩子

    onExit,       //退出路由的钩子

    views, Obj       //一旦有这个字段，那么说明这个路由是多视图路由,template,templateUrl,url将会被忽略
      views:{ 
        '模板容器的名字@父stateName':{
          template:''

          templateUrl:'',

          controller:'',

          controllerProvider:function(){

          }
        }

      }

    temlpate, str    //模板字符串
      '<h1>im a template</h1>'

    templateUrl,file_path/func  //模板路径
      'views/index.html',
      function(stateParams){
        return 'file_path'
      }

    transclude,true/false   //抽象路由

    data，

    resolve, Obj  //预载入一些方法，里面的key和value会直接return到controller中
      {
        preLoad:function(){
          return {
            name:'jie',
            age:'23'
          }
        }
      }
    
    controller:function(){ //为路由指定一个控制器

    }

    controllerAs，//为控制器起一个别名

    controllerProvider:function(stateParams){ //写入一些逻辑来判断是哪个controller
      stateParams,//可以获取到url中传递的参数

    }
  }
})
```

```js
//常用事件与方法
$state.go('stateName'[,paramas][,option])
```