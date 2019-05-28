function transNumTo3(num = 0) {
    num = num.toString();
    let prefix = "";
    let suffix = "";
    // 判断小数
    if (num.includes(".")) {
        prefix = num.split(".")[0];
        suffix = num.split(".")[1];
    } else {
        prefix = num;
    }

    let strArr = prefix.split("");
    for (let i = strArr.length - 3; i > 0; i -= 3) {
        strArr.splice(i, 0, ",");
    }

    return strArr.join("") + (suffix ? "." + suffix : "");
}

function transNumTo3Reg(num = 0){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/, ",")
}