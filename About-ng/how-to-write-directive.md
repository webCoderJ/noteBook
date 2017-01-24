## how to write directive

```js
  angular.module('app').directive('directiveName',function(){
    //必须要返回一个对象
    return {
      restrict:'E/C/M/A' //指定调用的方式
        E：<directive-name><directive-name> //这里的名字由指令名字的驼峰命名转化为 '-' 的形式
        C：//class, 不常用
        M：//注释，不常用
        A：<div my-directive> //这里的名字由指令名字的驼峰命名转化为 '-' 的形式

      replace:true/false //指定指令是否替换原有元素,true -> template中的内容会将<directive-name>元素从DOM中删除

      transclude:true/false //是否使用ng-transclude标签来包含template的内容

      scope:{ //一旦使用此字段，那么指令就会产生一个孤立作用域，如果不使用此字段，那么指令将会使用所在上下文的scope

        bindModle: '=/@/&' 
          '=' //通过 directive 的 attr 属性的值在局部 scope 的属性和父 scope 属性名之间建立双向绑定 
              //可以为任何类型的数据/但不能为表达式(eg:一个function) 但是在DOM上不能使用 {{  }}
              //应直接写bindModle="data"

          '@' //定一个局部 scope 属性到当前 dom 节点的属性值。结果总是一个字符串，因为 dom 属性是字符串 
              //-> 将父作用域的‘字符串’值单项传递给指令作用域

          '&' //提供一种途经使directive 能在父 scope 的上下文中执行一个表达式。
              //此表达式可以是一个 function。其实说白了，就是可以使用在父scope中定义的函数。
      }

      priority，//用于设置同一元素上有多个指令时，指令执行的先后顺序，猜测是number类型

      templateUrl:function/string,
        string:'tmlPath',
        function(element,attrs){
          return 'tplPath'
        }

      link:function(scope,ele,attr){
        scope://作用域
        ele:  //指令元素
        attr: //指令上的data-attrs
      }

      controller:string/func //指令的link和controller可以互换？
        string//回去查找注册在app中的控制器
        function($scope,$element,$attrs,$transclude){
          $scope://指令所在控制器的$scope,也可以注入ng的其他服务
          $transclude,//特殊的注入服务，
                      //嵌入链接函数会与对应的嵌入作用域进行绑定
                      //用于操作实际被执行的用来clone元素和操作DOM
                      //

        }

      controllerAs,//设置控制器的别名

      require,//string/array，用于指令之间的交互
              //简单来说， require 的作用就是为这个directive声明一个依赖关系，
              //表明此directive依赖另一个指令的 controller 属性。
        string//代表另外一个指令的名字
              //require 会将控制器注入到其值所指定的指令中
              //并作为当前指令的链接函数的第四个参数
              //前缀修饰
                ？//如果在当前指令中没有找到所需要的控制器,会将 null 作为传给 link 函数的第四个参数。
                ^ //如果添加了 ^ 前缀,指令会在上游的指令链中查找 require 参数所指定的控制器。
                ?^//将前面两个选项的行为组合起来,我们可选择地加载需要的指令并在父指令链中进行查找。如果没有前缀,指令将会在自身所提供的控制器中进行查找，如果没有找到任何控制器就抛出一个错误。

      compile:obj/func //用于指令编译时，改变DOM
        func:
          compile: function(tElem, tAttrs){
            console.log(name + ': compile');
            return {
              pre: function(scope, iElem, iAttrs){
                console.log(name + ': pre link');
              },
              post: function(scope, iElem, iAttrs){
                console.log(name + ': post link');
              }
            }
          }

  })
```
