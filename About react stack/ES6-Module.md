# ES6 - Module
## 概述
 + ES6的模块设计思想，是尽量的静态化，是编译是能确定模块的依赖关系，以及输入和输出变量。CommonJS和AMD模块，都只能在运行时确定这些东西。

## 严格模式
	+ ES6的模块自动采用严格模式，不管有没有在模块头部记上`use strict`
		- 变量必须声明再使用，ES5中如果变量不声明就自动变成了全局变量
		- 函数不能有同名的属性，否则会报错
		- 不能使用with语句
		- 不能对只读属性赋值
		- 不能使用前缀0表示八进制数
		- 不能删除不可删除的属性
		- `eval`不会在她的外层作用域引入变量
		- `eval`、`arguments`不能被重新复制
		- `arguments`不能自动反映函数参数变化
		- 不能使用`arguments.callee arguments.caller`
		- 禁止`this`指向全局对象
		- 不能使用`fn.caller & fn.arguments`获取函数调用的堆栈
		- 增加了保留字 eg：`protected statis interface`

## export命令
 + 多种写法
	```javascript
		export var firstName = 'Michael';
		export var lastName = 'Jackson';
		export var year = 1958;
		--------
		var firstName = 'Michael';
		var lastName = 'Jackson';
		var year = 1958;
		export {firstName, lastName, year}; //推荐使用
	```
 + 可输出函数或类
	```javascript
		export function multiply(x, y) {
		  return x * y;
		};
		--------
		//通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。可输出多次。
		function v1() { ... }
		function v2() { ... }

		export {
		  v1 as streamV1,
		  v2 as streamV2,
		  v2 as streamLatestVersion
		};	
	```
 + 错误的输出
```javascript
	// 报错
	export 1;

	// 报错
	var m = 1;
	export m;
	
	//报错
	function fn(){}
	export fn;
	--------
	//正确的输出方式
	// 写法一
	export var m = 1;
	
	// 写法二
	var m = 1;
	export { m }
	
	// 写法三
	var n = 1;
	export {n as m};

	function fn(){};
	exports { fn }
```
+ export输出的是动态值，这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新。
	```javascript
		exports var m = 'now'
		setInterval(() => m += 'then',500)
	```
+ export可出现在模块的任何位置，不过要处于模块顶层。不然会报错
	```javascript
		function fn(){
			export default 'bar'
		}
	```

## import from命令
+ import可以加载用export暴露的接口(必须)
	* `import { a,b,c } from './abc.js //.js可以省略'`
+ import也可以重命名
  * `import { a as a' } from './abc'` 
+ import后面的from指定模块文件的位置，也可以是相对/绝对路径,'.js'可以省略，如果只是模块明，没有路径，那么就必须有配置文件来告诉js引擎模块的位置。
+ 不能使用逻辑，表达式来引入模块
+ import具有提升效果，会在执行程序之前执行
+ import一旦加载完成，就会缓存起来，再次import相同的模块时，会读取缓存的内容。
+ 模块的整体加载
```javascript
	// circle.js
	export function area(radius) {
	  return Math.PI * radius * radius;
	}
	export function circumference(radius) {
	  return 2 * Math.PI * radius;
	}

	//可以使用逐一加载的方式
	import { area, circumference } from './circle';
	//也可采用整体加载的方式
	import `*` as circle from './circle';
```

## export default
```javascript
	// export-default.js
	export default function () {
	  console.log('foo');
	}

	// import-default.js
	import customName from './export-default';
	customName(); // 'foo'

	// export-default.js
	export default function foo() {
	  console.log('foo');
	}
	
	// 或者写成
	function foo() {
	  console.log('foo');
	}
	
	export default foo; //这里的foo对import来说是无效的，是同匿名函数

	// modules.js
	function add(x, y) {
	  return x * y;
	}
	export {add as default};
	// 等同于
	// export default add;
	
	// app.js
	import { default as xxx } from 'modules';
	// 等同于
	// import xxx from 'modules';
	
	//引入默认方法，同时引入其他变量或方法
	import _ ,{ each } from 'loadsh'
	//那么export 也要与之对应
	export default function(){}
	export function each (obj,iterator,context){}
	export {each as forEach}
```

	