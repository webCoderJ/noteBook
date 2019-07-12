function flattenJson(json) {
    let result = {};
    function loop(obj, prop = "") {
        // 简单类型
        if (Object(obj) !== obj) {
            result[prop] = obj;
        } else if (Array.isArray(obj)) {
            if (obj.length === 0) {
                result[prop] = [];
            } else {
                for (var i = 0; i < obj.length; i++) {
                    loop(obj[i], `${prop}[${i}]`);
                }
            }
        } else {
            for (key in obj) {
                loop(obj[key], prop ? prop + "." + key : key);
            }
            if (Object.keys(obj).length === 0 && prop) {
                obj[prop] = {};
            }
        }
    }

    loop(json);
    return result;
}

// console.log(flattenJson(toFlattern));

// 完全二叉树 二叉搜索树

class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        let newNode = new Node(key);
        function insertTo(node, newNode) {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertTo(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertTo(node.right, newNode);
                }
            }
        }

        if (!this.root) {
            this.root = newNode;
        } else {
            insertTo(this.root, newNode);
        }
    }

    zigzagLevelOrder() {
        let h = 0;
        let result = [this.root];
        let parentNodePool = [this.root];
        let curNodePool = [];
        while (parentNodePool.length > 0) {
            h++;
            for (let item of parentNodePool) {
                if (item.left) {
                    curNodePool.push(item.left);
                }
                if (item.right) {
                    curNodePool.push(item.right);
                }
            }
            parentNodePool = [...curNodePool];
            if (h % 2 === 0) {
                result.push(...curNodePool.reverse());
            } else {
                result.push(...curNodePool);
            }
            curNodePool = [];
        }

        return result;
    }
}

let tree = new BinarySearchTree();
let arr = [3, 1, 4, 9, 6, 7, 5];
for (let i = 0; i < arr.length; i++) {
    tree.insert(arr[i]);
}

console.log("TCL: tree", JSON.stringify(tree, "", 2));

console.log(tree.zigzagLevelOrder());
