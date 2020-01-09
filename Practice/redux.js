import { createStore, applyMiddleWares } from "redux";
import reduxThunk from "redux-thunk";

const handleTodos = function(state, action){

}

function applyMiddleWares(...middleWares){
  let 
}

let rducers = {
  handleTodos
}

const store = createStore(
  reducers,
  initState,
  applyMiddleWares(reduxThunk)
)

export default store;

// redux-thunk改造了dispatch方法

store.dispatch(function(dispatch){
  dispatch('action-a')
  fetch().then(res => {
    dispatch('action-b')
  })
})
