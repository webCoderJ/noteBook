class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
// 定义
// 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 
// 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 
// 它的左、右子树也分别为二叉排序树。
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        const newNode = new Node(key);
        function insertNode(node, newNode) {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        }

        if (!this.root) {
            this.root = newNode;
        } else {
            insertNode(this.root, newNode);
        }
    }

    // 中序遍历：左侧子节点 => 节点本身 => 右侧子节点
    inOrderTraverse(cb) {
        function inOrderTraverseNode(node, cb) {
            if (node !== null) {
                inOrderTraverseNode(node.left, cb);
                cb(node.key);
                inOrderTraverseNode(node.right, cb);
            }
        }
        inOrderTraverseNode(this.root, cb);
    }

    // 先序遍历：节点本身 => 左侧子节点 => 右侧子节点
    prevOrderTraverse(cb) {
        function prevOrderTraverseNode(node, cb) {
            if (node !== null) {
                cb(node.key);
                prevOrderTraverseNode(node.left, cb);
                prevOrderTraverseNode(node.right, cb);
            }
        }
        prevOrderTraverseNode(this.root, cb);
    }

    // 后序遍历：左侧子节点 => 节点本身 => 右侧子节点
    postOrderTraverse(cb) {
        function postOrderTraverseNode(node, cb) {
            if (node !== null) {
                postOrderTraverseNode(node.left, cb);
                postOrderTraverseNode(node.right, cb);
                cb(node.key);
            }
        }
        postOrderTraverseNode(this.root, cb);
    }
}

// let bst = new BinarySearchTree();
// for (let i = 0; i < 10; i++) {
//     bst.insert(~~(Math.random() * 1000));
// }

// bst.inOrderTraverse(function(key) {
//     console.log(key);
// });

// 二叉搜索树排序
function binarySearchSort(arr) {
    console.time("二叉搜索排序: ")
    let sortBst = new BinarySearchTree();
    for (let i = 0; i < arr.length; i++) {
        sortBst.insert(arr[i]);
    }
    let result = [];
    sortBst.inOrderTraverse(function(val){
        result.push(val);
    })
    console.timeEnd("二叉搜索排序: ")
    return result;
}
