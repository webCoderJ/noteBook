let user = {
    name: "John",
    money: 1000,
    toString: function() {
        console.log("call toString");
        return "200";
    },
    valueOf: function() {
        console.log("call valueOf");
        return 100;
    },
    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

let a = {
    toString: function() {
        console.log("call toString");
        return "200";
    },
    valueOf: function() {
        console.log("call valueOf");
        return 100;
    }
    // [Symbol.toPrimitive](hint) {
    //     console.log(`hint: ${hint}`);
    //     return hint == "string" ? `200` : 100;
    // }
};



let b = [];

b.toString = function(){
    console.log("call toString");
    return "200";
}
b.valueOf = function(){
    console.log("call valueOf");
    return 100;
}

console.log(b + '123');
console.log(b == 100);
console.log(b == '100');
console.log(b > 100);
console.log(+b);
console.log(b - 1);
console.log(String(b));