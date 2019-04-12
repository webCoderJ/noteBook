/**
 * 判断当前时间是否在一个时间段内(除去周六日)
 * @param beginTime
 * @param endTime
 * @returns {boolean}
 */

const time_range = function (beginTime, endTime) {
    if (new Date().getDay() === 6 || new Date().getDay() === 0) {
        return false;
    }
    let strb = beginTime.split(":");
    if (strb.length !== 2) {
        return false;
    }

    let stre = endTime.split(":");
    if (stre.length !== 2) {
        return false;
    }

    let b = new Date();
    let e = new Date();
    let n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        return false;
    }
};

module.exports = time_range;
