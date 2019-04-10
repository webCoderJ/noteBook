/* @flow */

Vue.prototype._update = function(vnode, hydrating) {
    const vm = this;
    const prevEl = vm.$el;
    const prevVNode = vm._vnode;
    const prevActiveInstance = activeInstance;
    activeInstance = vm;
    // 更新vnode
    vm._vnode = vnode;
    if (!prevVNode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false, vm.$options._parentELm, vm.$options._refElm);
    } else {
        // 对比两个Node
        vm.$el = vm.__patch__(prevVNode, vnode);
    }

    activeInstance = prevActiveInstance;

    if (prevEl) {
        prevEl.__vue__ = null;
    }

    if (vm.$el) {
        vm.$el.__vue__ = vm;
    }

    // 判断HOC - 高阶组件
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el
    }
};

