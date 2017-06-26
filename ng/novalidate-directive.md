## Angular 表单验证

+ 使用ng的表单验证的几个必要
  1. form标签的name属性，它决定了最终的controller中生成的表单对象的名字。
  2. form中添加 `novalidate` 属性，用以屏蔽掉HTML自带的表单验证功能。

+ 常用的验证指令
  1. `required` -> 该字段是必要的。
  2. `ng-minlength` , `ng-maxlength` -> 最大长度和最小长度。
  3. `ng-patern` -> 为当前元素添加一个正则验证规则。
  4. `ng-disabled` -> 禁用当前元素，可以配合表单错误对象使用。

+ angular会自动根据表单状态设置对应的class
 1. 表单合法时 - ng-valid
 2. 表单不合法时 - ng-invalid
 3. 表单未修改时 - ng-pristine
 4. 表单已经修改 - ng-dirty

+ 自定义验证

```js
  
  angulr.module('app',[])
  .directive('ensureUniquue',['$http',function($http){
    return {
      require:'?ngModel',
      link:function(scope,element,attrs,ngCtrl){
        scope.$watch(attrs.ngModel,function(){
          $http({
            method:'POST',
            url:'/api/check' + attrs.ensureUnique,
            data:{
              'field':attrs.ensureUnique
            }
          })
          .success(fn)
          .error(fn)
        })
      }
    }
  }]);

```

+ 绑定在$rootScope上的表单对象formName.inputFiled.property,验证规则是在input中添加的验证方法 
  1. $pristine/$dirty(bool) -> 用户是否修改
  2. $invalid/$valid(bool) -> 验证失败/成功
  3. $error.property($invalid,$dirty,pattern,maxlength,minlength,$pristine) ->验证失败为true