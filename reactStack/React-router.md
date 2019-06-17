# React-router
0. 所谓路由就是加载不同的组件结构
1. 安装
 + `npm install -S react-router`
2. 引用
```js
	// Router 只是是一个容器组件，要通过route组件来定义
  import { Router,Route,hashHistory } from 'react-router';
	import { render } from 'react-dom'

	render((
		<Router>
			<Router history={ hashHistory }>
				<Route path='/' component={ App }></Route>
			</Router>
		</Router>
	))
```

3. 使用
+ 路由的嵌套使用

```js
/*
	嵌套路由直接使用便签嵌套的方式，分别指定两个字段
	1. path -> 嵌套的路径
	2. component -> 需要加载的组件
*/
<Router history={ hasHistory }>
	<Route path='/' component={ App }>
		<Route path='/repos' component='Repos'></Route>
		<Route path='/About' component='About'></Route>
	</Route>
</Router>

==>

// 通过路由嵌套的组件可以通过this.props.children访问
<App>
	<Repos></Repos>
</App>

------

//子路由也可以不写在Router里面,也可以分开写
//www.tigerwit.com/#/home/repos

let routes = <Route path='/home' component={ App }>
		<Route path='/repos' component='Repos'></Route>
		<Route path='/About' component='About'></Route>
	</Route>

<Router routes={ routes } history={ hashHistory }></Router>
```

4. 通配符

```java
<Route path="/hello/:name">

// 匹配 /hello/michael
// 匹配 /hello/ryan
:paramName 可以通过this.props.pramas.paramName 取出 --> 路由会将这个属性传给组件
//通过 this.props.location.query 可以获取到当前路径的查询字段

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan
( ) -> 表示这个参数是可选的，可以不传，如果不传就会访问 /hello

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

5. 路由规则

```js
<Router>
	<Route path="/:userName/:id" component={UserPage}/>
	<Route path="/about/me" component={About}/>
</Router>
// 子路由中的path属性的 / 可以不写，相对路径。如果写了就代表从根路径开始寻找
//如果访问 /about/me 不会触发第二个路由，因为这个可以匹配第一个路由的规则，所以会中断。
//所以一般将带有参数的路由写在最后面
```

6. IndexRoute

7. Redirect组件

```javascript
	//访问/index/message/5,会跳转到 message/5
	<Route path='index' component={ Index }>
		<Redirect from='message/:id' to='/message/:id'></Redirect>
	</Route>
```

8. IndexRedirect

```javascript
	// 当访问 / 的时候会重定向到 Welcome
	<Route path='/' component={ App }>
		<IndexRedirect to='/welcome'></IndexRedirect>
		<Route path='/welcome' component={ Welcome }></Route>
	</Route>
```

9. Link
> Link组件就是React的a标签，也相当于angular的 ui-sref
```javascript
	render(
		<div>
			<ul role='nav'>
				<li>
					<Link to='/about' activeStyle={{color:'aqua'}}></Link>
					<Link to='/welcome' activeStyle={{color:'blue'}}></Link> //指定激活样式
					<Link to='/welcome' activeClassName="active"></Link> //指定激活类名
				</li>
			</ul>
		</div>
	)
```

10. IndexLink
> 如果链接到根路由，不要使用Link组件，要使用IndexLink，因为对于根路由来说activeStyle,activeClassName
	会失效，或者说总是处于激活状态，因为 / 会匹配所有路由。所以使用IndexLink来精确匹配
	实际上，IndexLink就是对Link组件的onlyActiveOnIndex属性的包装。

```javascript
<IndexLink to='/' activeStyle={{color:'aqua'}}>
	Home
</IndexLink>

------
// 如果要使用Link也可以，那么就要使用onlyActiveOnIndex
<Link to='/' activeClassName='active' onlyActiveOnIndex={true}></Link>
```

11. history
> router的history属性会监听浏览器的地址变化，并将URL解析成一个地址对象给Router使用
	history的属性可以设置为三种
+ browserHistory 
	浏览器正常路径没有 # 需要对服务器进行相关兼容 /不太适用于SPA
+ hashHistory 有 # SPA适用
+ createMemoryHistory 主要用于服务器渲染
+ 使用browserHistory.push('/location') 进行跳转
+ 跳转还能通过context来实现
```javascript
	export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },
})
```

12. 路由的事件
	+ onLeave
	+ onEnter

```javascript
	<Route path='index'
		onEnter={enterHandle}
		onLeave={leaveHandle}
	></Route>
```