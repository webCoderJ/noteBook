# Redux - middleware使用方法

## redux-logger
> 
+ `import { applyMiddleware,createStore } from 'redux'`
+ `import createLogger from 'redux-logger';`
+ `const logger = createLogger`;
```
	//使用createStore方法创建store的时候使用传入applyMiddleware方法使用中间件。
	const store = createStore(reducer,applyMiddleware(logger))
``` 
+ 注意点
	+ createStore方法可以接收震哥应用的出事状态作为参数，那么`applyMiddleware()`就变为createStore的第三个参数。
```
	const store = createStore(reducer,initialState,applyMiddleware(logger))
```
	+ 中间件的次序很重要！
```
	// applyMiddleware可以传入多个中间件，但是传入的时候要讲究先后顺序，使用前要查阅文档，比如logger一定要放在最后才能正确执行。
	const store = createStore(reducer,initialState,applyMiddleware(thunk,promise,logger))
```

## 异步操作的基本思路
> 
+ 异步操作与同步操作的不同在于需要一次发出三个action
	+ 开始操作时发出的 Action
	+ success执行的Action
	+ fail执行的Action
+ 异步操作需要三个action所对应的state和对应的处理函数(reducer)

### Redux-thunk -- 让store.dispatch可以函数参数来实现异步操作。
> 
+ 异步操作至少需要送出两个Action，成功和失败，那么怎么在操作结束时，系统自动发出第二个action呢？那就要使用Action Creator
```
const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```

### redux-promise -> 让actionCreator返回一个promise对象来实现异步操作
> 
```
import { createStore,applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise'
import reducer from './reducers';

const store = createStore(reducer,applyMiddleware(promiseMiddle))
```
+ 这个中间件是的Store.dispatch方法可以接收一个Promise对象，这时异步操作的写法如下：
```
	const fetchPosts = 
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});

也可以使用action中的payload属性来传入一个promisse对象，那么就需要使用redux-actions模块中国的createACtion方法，写法如下
```
[RYF介绍](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

## compose函数执行推测
>
+ 返回一个可接受参数的方法
	1. var caller = compose(...funcs); //会按照传入的顺序执行。
	2. caller(createStore)
	3. 最终返回的是效果是洋葱剖面函数：
```
const configureStore = function(initialState) {
    return createStore(reducer, initialState || [], applyMiddleware(thunk, logger()))
}

var finalCreateStore = compose(applyMiddleware(thunk, logger()))(createStore);

 var configureStore = function(initialState) {
   initialState = initialState || {todos: []}
   return finalCreateStore(reducer, initialState);
 };
```
	
	