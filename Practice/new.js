function newFn(Con, ...args){
    let obj = {};
    obj.__proto__ = Con.prototype;
    return Con.call(obj, args);
}