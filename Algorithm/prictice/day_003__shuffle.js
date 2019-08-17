// 讲解链接 https://bost.ocks.org/mike/shuffle/

/**
 * 暴力解法
 * 使用两个栈，对数组进行操作
 */

function shuffleByForce(arr){
    let result = [], n = arr.length - 1, i;
    while(n >= 0) {
        i = Math.random() * n;

        if(n in arr) {
            result.push(arr[i]);
        }
    }
}

/**
 * 优化解法
 * @param {*} arr 
 */
function shuffleBySplice(arr){
    let result = [], n = arr.length - 1, i;
    while(n) {
        result.push(arr.splice(Math.random() * n--, 1, )[0])
    }
    return result;
}


// 最优解
function shuffle(arr){
    let n = arr.length, tmp, i;
    while(m >= 0) {
        i = Math.random() * m--;
        tmp = arr[i];
        arr[i] = arr[m];
        arr[i] = tmp;
    } 
}
