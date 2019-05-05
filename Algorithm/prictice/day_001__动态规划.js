/**
 * 动态规划 - 背包问题
 * [讲解](https://www.codercto.com/a/21456.html)
 * nth vals weights cap0 cap1 cap2 cap3 cap4 cap5
 * 0    3      2     0    0     3    3    3    3
 * 1    2      3     0    0     3    4    4    7
 * 2    5      4     0    0     3    3    5    7
 *
 * 保证表格每一横行为最优解，那么本次只需要与上次最优解做对比即可得到本此最优解
 */
// values = [3, 4, 5],
// weights = [2, 3, 4],
function knapSack(vals, weights, capacity) {
    let len = vals.length;
    // target - table
    let T = [];
    /**
     * 指针 i
     * 遍历所有个数情况
     */
    for (let i = 0; i < len; i++) {
        // 对应表格 - 行
        T[i] = [];
        /**
         * 指针 j
         * 遍历所有容量情况
         * 容量从 1 开始，减少一次判断
         */
        for (let j = 1; j < capacity; j++) {
            // 如果容量小于当前物品重量
            if (weights[i] > j) {
                // 如果是第一行，则什么都还未装
                if (i === 0) {
                    T[i][j] = 0;
                } else {
                    // 不是第一行的情况，并且不满足当前物品容量的，当前所能取得最大值还是与上一行一致
                    T[i][j] = T[i - 1][j];
                }
            }
            // 背包能满足当前物品重量
            if (i === 0) {
                // 如果只有一个物品情况
                T[i][j] = vals[i];
            } else {
                /**
                 * 上一行最优解和本次可取值与剩余空间物品价值和对比
                 * 得出本次最优解
                 */
                T[i][j] = Math.max(T[i - 1], vals[i] + T[i - 1][j - weights[i]]);
            }
        }
    }
}

/**
 * 动态规划 - 股票买卖最优时机, 计算出最大获利
 * [讲解](https://www.jianshu.com/p/749650f88985)
 * 思考一个问题：如何使本次最优解能成为下一次最优解的基础，则下一次只需要参照本次解即可得到最优解
 * 下列股票走势
 * [1,3,4,2,4,7,9]
 * 要让下一次最优，则保证本次买卖获利最大
 * KEY: 一次买入和卖出可以拆分成连续数天的买入和卖出:
 *      在第一天买入并在第三天卖出，可以拆分成第一天买入、第二天卖出、第二天买入、第三天卖出
 */

function stockMaxProfits(trends) {
    // 获得所有涨幅
    let growths = [];
    for (let i = 0; i < trends.length; i++) {
        growths.push(trends[i + 1] - trends[i]);
    }

    let curProfit = 0;
    let maxProfit = 0;
    for (let i = 0; i < growths.length; i++) {
        if (curProfit + growths[i] > curProfit) {
            curProfit += growths; // 这里的 += 可以理解为持仓，使利润最大
        } else { // 说明有利润为负的情况，则应该卖出
            curProfit = 0; // 卖出点为i - 1
        }
        if (curProfit > maxProfit) {
            maxProfit = curProfit;
        }
    }
}
