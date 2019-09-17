import { createStore, applyMiddleware, compose } from "redux";

let reducers = {
    stateA(state, action) {}
};

let initState = {
    a: "stateA"
};

let store = createStore(reducers, initState, applyMiddleware(reduxThunk, logger));

// 框架传入createStore并执行
function applyMiddlewares(...midwares) {
    return createStore => (reducer, preloadState, enhancer) => {
        let store = createStore(reducer, preloadedState, enhancer);
        let dispatch = store.dispatch;
        let chain = [];

        let midwareApis = {
            dispatch: store.dispatch,
            getState: store.getState
        };

        chain = midwares.map(midware => midware(midwareApis));
        dispatch = compose(...chain)(store.dispath);
        // midA(midb(midC(store.dispatch)))

        return {
            ...store,
            dispatch
        };
    };
}
