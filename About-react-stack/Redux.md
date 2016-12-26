# redux
## 概述

+ `React`的核心是使用组件定义界面的表现，是`VIEW`层，那么使用`React`	时我们还需要一套机智区管理组件和组件，组件与数据模型之间的通信。
+ 为什么要使用redux呢？ Facebook提出了`FLUX`的思想来管理数据流，而`Redux`就实现了这一思想，类似的框架还有`reflux`,`flummox`
+ `FLUX` : Actions -> Stores -> View Components -> Actions ...
	+ Stores 就是所有组件的state树
+ redux 维护了唯一一个`state`树，不管项目多复杂，我们只需要管理一个`state`树，不用担心`state`树多么庞大，因为`redux`中的`reducer`机制可以解决这个问题。

## redux-dev-tool
>	
	+ 开发调试工具 `redux-devtools`
	+ 应用无刷新保存工具 `hot-loader`
 
## Redux Store
> 
	+ `Store`是保存react状态数据的一个容器，一个应用就只能有一个`Store`
	+ `import { createStore } from redux`
	`const store = createStore(fn,initialState)//返回一个Store对象` 。
	+ 通过`store.getState()`,Redux会将当前的所有状态返回。

## Redux Action
> 
	+ `state`变化会导致view变化，用户不能直接操作state，只有通过action来告知State应该做出改变了，action就是view发出的通知。
	+ `Action`也是一个数据对象，其中必须包含type属性，其他属性，可以自由设置。
	+ `const action ={type:'ADD_TODO',playload:'Desc' }`
	+ 如果view需要想store发送多个消息，那么就需要很多个action，可以通过一个actionCreator(自己写的)数来添加。
	+ `store.dispatch()`是view发出Action的唯一方法
		+ store.dispatch(actionCreator(type))

##Reducer
> 
	+ store收到action后，会给出一个新的state，这样react才会重新渲染view。这个计算过程就叫`reducer`，reducer接收一个state和action，返回一个新的state
	+ 当使用`store.dispatch()`方法的时候就会触发redux的reducer函数。
	+ reducer是一个纯函数：不能改写参数，不能调用系统T/O的API，不能使用返回值不定的方法。
	+`combineReducers`用于组合单个reducer，返回一个大的reducer。

## 监听state的变化
> 
+ `store.subscribe(listener)`方法可以监听state的变化，可以把它看做一个自定义事件。其中的listener是动作的执行函数。
+ `store.subscribe`会返回一个函数，用于解除监听。
```javascript
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
unsubscribe();
```

## redux的工作流程
> 
+ `//创建store的时候将reducer函数传入。
	var store = Redux.createStore(reducer[,initialState[,]];
	//store.dispatch()方法执行的时候会触发reducer函数改变state,其实reducer就是派遣动作的回调函数，要执行什么操作区改变state
	store.dispatch({
		type:'addTodo',
		playload:1
	});
	//当状态变化的时候执行监听动作，一般是重新渲染
	store.subscribe(render)`

## DEMO
```javascript
	const Counter = React.createClass(
		render :function(){
			return(
			<div>
				<p>{ this.props.value }</p>
				<button onclick={ this.props.add }>+</button>
				<button onclick={ this.props.minus }>-</button>
			</div>
			)	
		}
	);

	const store = Redux.createStore(reducer)

	const reducer = (state=0,action) => {
		switch (action.type) {
			case 'add' : 
				return state += action.playload
				break;
			case : 'minus':
				return state -= action.playload;
		}
	}

	const render() => {
		React.render(
				<Counter add={store.dispatch(type:'add',payload:'1')}>
			)
	}

	const render() => {
		ReactDOM.render(
					<Counter add={store.dispatch( type:'add',payload:'1' )}
							minus={store.dispatch( type:'minus',payload:'1' )}
					>,
					document.getElementById('react-redux')
		);
	}

	//调用render进行组件的首次渲染
	render()
	store.subscribe(render)



```


