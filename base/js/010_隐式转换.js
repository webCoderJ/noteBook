// Symbol.toPrimitive

let obj = {
    [Symbol.toPrimitive](hint){
        console.log(this, hint);
    }
}

// console.log(+obj);
// console.log(`${obj}`);
console.log(obj + "1");
