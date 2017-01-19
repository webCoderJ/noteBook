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

      link:function(scope,ele,attr){
        scope://作用域
        ele:  //指令元素
        attr: //指令上的data-attrs
      }

      controller:function(){

      }

      require
  })
```
