function* idGenarator() {
    for (let i = 0; i >= 0; i++) {
        yield i;
    }
}

let id = idGenarator();

// console.log(id.next());

function* yieldVal() {
    let a = yield 1;
    console.log("1 - resolved", a);
    yield a;
}

let nextParam = yieldVal();
// v8会忽略第一次的next参数，因为next的参数是作为上一次yield的返回值
// console.log(nextParam.next());
// console.log(nextParam.next(1));

// throw

function* throwGen() {
    try {
        yield 1;
    } catch (e) {
        console.log("内部捕获", e);
    }
}

// let i = throwGen();
// i.next();

// try {
//     i.throw("generator-err 1")
//     // i.throw("generator-err 2")
// } catch (e) {
//     console.log("外部捕获", e);
// }

function* gReturn() {
    yield 1;
    yield 2;
    yield 3;
}

// let j = gReturn();
// console.log(j.next());
// console.log(j.return(-1));
// console.log(j.next());

function* gen2() {
    yield 4;
    yield* gReturn();
    yield 5;
    return console.log("done");
}

// let gen_2 = gen2();
// console.log(gen_2.next());
// console.log(gen_2.next());
// console.log(gen_2.next());
// console.log(gen_2.next());

// function* gen_flat_arr(arr) {
//     if (Array.isArray(arr)) {
//         for (let i = 0; i < arr.length; i++) {
//             yield* gen_flat_arr(arr[i]);
//         }
//     } else {
//         yield arr;
//     }
// }

// for (let x of gen_flat_arr([1, 2, [3, 4]])) {
//     console.log(x);
// }

// let obj = {
//     * genKey(){
//         yield 1;
//     }
// }

// this
// function* foo(){
//     this.a = 1;
//     this.b = 2;
//     console.log(this)
// }

// let a = foo();
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p1-resolved");
    }, 500);
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p2-resolved")
    }, 1500);
})

async function asyncFn1(){
    let res1 = await p1;
    console.log(res1);
    let res2 = await p2;
    console.log(res2);
    return "all-resolved"
}

asyncFn1().then(res => {
    console.log(res);
})