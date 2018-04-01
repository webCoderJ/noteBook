## ng-model-in-deep

+ $viewValue:显示在页面的实际值
+ $modelValue: 赋给ng-model的值
+ $parsers:执行数组，数组内是数据操作函数，ng-model的从DOM读取的值会被传入到数组里的函数，然后依次将数据操作结果传给下一个解析函数，最后一个函数执行的结果会传入model数据模型中，可以将自定义的解析函数push进去
+ $formatters:与$parsers差不多，主要是用来对值进行格式化或格式转换
+ $viewChangeListeners:也是一个数组，当视图变化时会被一一调用
+ $render:将model同步渲染到视图，在上述数组中函数执行完毕会调用这个方法，这个方法还可以重新定义以达到自定义渲染的目的

```js
angular.directive('myD',function(){
  return {
    require:'?ngModel',
    link:function(scope,ele,attrs,ngCtrl){
      ngCtrl.$render = function(){
        element.html(mgModel.$viewValue() || 'empty')
      }
    }
  }
})

```

+ $setViewValue:用于设置视图值
+ $error:包含errors的对象
+ $setPristine:设置为原始状态为true,并且会添加一个ng-pristine的class，同时移除ng-dirty
+ setValidity(errName,value)
  * eg. controller.$setValidity('twformValidTxt', true);
+ $isEmpty
+ $valid
+ $dirty

```js
//自定义验证
(function () {
    'use strict';

    angular
        .module('fullstackApp')
        .directive('twformValidTxt', twformValidTxt);

    twformValidTxt.$inject = ['validator'];
    
    /**
     * twformValidTxt directive
     * @desc 自定义表单验证
     * 验证输入的文本（如：username）是否符合格式要求
     */
    function twformValidTxt(validator) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, controller) {
                var type = attrs.txtType,
                    minLen = attrs.minLen,
                    maxLen = attrs.maxLen;

                console.log(controller);
                controller.$parsers.push(function (viewVal) {
                    var empty = controller.$isEmpty(viewVal);

                    if (empty) {
                        controller.$setValidity('twformValidTxt', true);
                        return undefined;
                    }

                    if (validator.isValidTxt(type, viewVal, minLen, maxLen)) {
                        controller.$setValidity('twformValidTxt', true);
                        return viewVal;
                    } else {
                        controller.$setValidity('twformValidTxt', false);
                        return undefined;
                    }
                });
            }
        };
    }
})();

```
