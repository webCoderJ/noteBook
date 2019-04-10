/**
 * @param {*} oldVNode
 * @param {*} vnode
 * @param {*} hydrating SSR
 * @param {*} removeOnly
 * @param {*} parentElm
 * @param {*} refElm
 */
function patch(oldVNode, vnode, hydrating, removeOnly, parentElm, refElm) {
    // 如果新的node不存在，直接销毁
    if (isUndef(vnode)) {
        if (idDef(oldVNode)) invokeDestoryHook(oldVNode);
        return;
    }

    // 是否第一次调用patch
    let isIniitialPatch = false;

    const insertedVNodeQueen = [];

    // 老节点为空，则直接创建元素
    if (isUndef(oldVNode)) {
        isIniitialPatch = true;
        createElement(vnode, insertedVNodeQueen, parentElm, refElm);
    } else {
        const isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
            // patch existing root node
            /*是同一个节点的时候直接修改现有的节点*/
            patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
        } else {
            if (isRealElement) {
                // mounting to a real element
                // check if this is ssr cotent and if we can perform
                // a successful hydration.
                if (oldVNode.nodeType === 1 && oldVNode.hasAttribute(SSR_ATTR)) {
                    /*当旧的VNode是服务端渲染的元素，hydrating记为true*/
                    oldVnode.removeAttribute(SSR_ATTR);
                    hydrating = true;
                }

                if(isTrue(hydrating)) {
                    if(hydrate(oldVNode, vnode, insertedVNodeQueen)) {
                        invokeInsertHook(vnode, insertedVNodeQueen, true);
                        return oldVNode
                    } else if(process.env.NODE_ENV !== 'production') {
                        warn(
                            'The client-side rendered virtual DOM tree is not matching ' +
                            'server-rendered content. This is likely caused by incorrect ' +
                            'HTML markup, for example nesting block-level elements inside ' +
                            '<p>, or missing <tbody>. Bailing hydration and performing ' +
                            'full client-side render.'
                          )
                    }
                }
            }
        }
    }
}
