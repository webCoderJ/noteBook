console.log(typeof NaN);            // number
console.log(typeof undefined)       // undefined
console.log(typeof null)            // object

console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true