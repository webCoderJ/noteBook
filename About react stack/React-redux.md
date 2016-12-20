# React - Redux

## UI组件的概念
> 
+ 只负责UI的呈现，不带有任何逻辑
+ 没有状态，即不使用this.state这个变量
+ 所有数据都由参数this.props提供
+ 不是用任何Redux的API
+ eg: `const Title = value => <h1>{ value }</h1>`   //纯组件，和纯函数一样，所有数据都由参数决定。

## 容器组件
> 
+ 与UI组件的特征相反
+ 负责管理数据和业务逻辑，不负责UI的呈现
+ 带有内部的状态
+ 使用REDUX的API

## 容器的总结
> 
+ UI组件负责页面的结构和样式，容器组件负责传入逻辑和state数据
+ React-Redux规定，所有的UI组件都由用户提供，容器组件都是由React-redux提供，所有的状态管理任务都交给他。

## 生成顶层组件
> 
+ React-Redux提供了一个connect方法生成容器组件。
+ `import{ connect } from 'react-redux'`
+  `const ContainerComponent = connect()(UiComponent)`
+  为容器组件输入逻辑(外部的数据 -> state对象);
	+  `mapStateToProps(function(state)) //返回一个对象`
	+  `var mapStateToProps = function (state) { return state;};`
+  为容器添加actions，让UI组件具有输出逻辑
	+  `mapDispatchToProps = function(state,[ownProps -> 容器组件自己的props])) //返回一个对象`
	+  `mapDispatchToProps = {} //可以直接等于一个对象，那么就不能传入逻辑参数，具体根据需求使用以上两种方式`
	```
		var mapDispatchToProps = function (dispatch) {
		  return {
		    actions: bindActionCreators(actions, dispatch) //将action和dispatch绑定在一起，子组件可以直接调用这个方法，就可发出一个action。
		    dispatch(increaseAction) //也可以通过这种方法手动组合。
			  };
		}
	```

##  顶层组件Provider
> 
+ react-redux 将所有store传给顶层Provider组件，那么所有的子组件就可以通过单向数据流获得数据。
+ 容器组件必须使用Provider来包裹，子组件才能获得connect生成的数据。
```
	render(
		  <Provider store={store}>
		    <App />
		  </Provider>,
		  document.getElementById('root')
		)
```	