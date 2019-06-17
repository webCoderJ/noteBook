function newFn(Con, ...args){
    let obj = {};
    obj.__proto__ = Con.prototype;
    return Con.call(obj, args);
}

function _new(con, ...args){
    let obj = {};
    obj.__proto__ = con.prototype;
    return con.call(obj, ...args)
}
