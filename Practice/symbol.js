let sym1 = Symbol();
let sym2 = Symbol();

let obj = {
    [sym1]: 1,
    a: 2
};

console.log(Object.entries(obj)); // [ [ 'a', 2 ] ]

console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(1) ]

console.log(Object.getOwnPropertyNames(obj)); // a

Symbol.for("bar") === Symbol.for("bar"); // true

Symbol("bar") === Symbol("bar"); // false

let saaa = Symbol.for("aaa")
let sbbb = Symbol("bbb")

console.log(Symbol.keyFor(saaa)); // aaa

console.log(Symbol.keyFor(sbbb)); // undefined

Symbol.iterator; // 可遍历结构 Obj[Symbol.iterator] = function* (){ return yiled 1 }

Symbol.hasInstance;

class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}

console.log(1 instanceof Even); // false

console.log(2 instanceof Even); // true
