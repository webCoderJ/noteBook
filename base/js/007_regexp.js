let catch_x = /(foo)(bar)/gi;

function reg(str, regExp) {
    return {
        match: str.match(regExp),
        exec: regExp.exec(str)
    };
}

// console.log(reg("foo foobar bar a barb", catch_x));

// console.log('bar foo'.replace( /(foo)/, '$1...' ));

// console.log('possibly yesterday'.match(/\B../));

let html = "<p><span>text1</span><span>text2</span></p>";

// console.log(html.match(/<span>(.+)<\/span>/));
// console.log(/<span>(.+)<\/span>/.exec(html));

let date = "2017-11-21";
let res = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$2/$3/$1");

let nameList = `
Brandon Stark
Sansa Stark
John Snow
`;

let res1 = nameList.match(/^\w+(?:\s?Stark)/gm); // => ["Brandon", "Sansa"]
// console.log("TCL: res1", res1);

function transNumTo3reg(num = 0) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(transNumTo3reg(1111222333.11));

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

console.log(transNumTo3(11231222.12));
