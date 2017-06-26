# React-redux-demo

```javascript
  client.js
  import App from 'App';
  import actions from './redux/actions'
  import connect from 'react-redux'
  import Provider from 'react-redux'
  import bindActionCreators from 'redux'
  import React from 'react'
  import render from 'react-dom'
  import store from './redux/store'

  1. 引入App容器组件
  2. 使用connect连接App组件(UI)成为一个容器组件,以供Provider使用,最后才能将store传递给App组件
    + var AppCon = connect(mapStateToProps,mapDispatchToState())(App) --> redux
      - mapStateToProps(state)
      - mapDispatchToProps(dispatch=>{
        return {
          actions:bindActionCreator(actions,dispatch) //将dispatch和actions链接在一起，生成一些事件方法，
        }
      });
  3.使用Provider组件包裹容器组件AppCon,并将store传递给App组件 //redux/store.js
    + store通过redux创建
      - import reducer from './redux/reducer'
      - import { applyMiddleWare,compose,createStore } from 'redux'
      - import { logger } from 'redux-logger' //日志中间件，必须最后传入
      - import { thunk } from 'redux-thunk' //使action支持promise

      var initialState = {
        thead:['待办事项','状态','删除/完成'],
        tbody:[{
          title:'learn react-redux-app',
          hasCompleted:false,
          id:1
        }]
      }

      var stateCreator = (initState) => {
        compose(applyMiddleWare(thunk,logger))(createStore)(reducer,initState)
      }

      module.export = stateCreator(initialState)

    + <Provider store={store}>
        <App />
      <Provider />
```

```js
  //App.js
  1.创建App容器组件
  2.连接子组件
  3.子组件通过this.props.actions.action(data)
  4.reducer改变store -> 传递到各层组件 -> UI变化
```

