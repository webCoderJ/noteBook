let obj = {
    prop1: "123",
    prop2: "456"
}

let json = JSON.stringify(obj, ['prop1'], 4)

console.log(json);