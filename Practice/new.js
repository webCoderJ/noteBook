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

function Foo(){
    return new.target;
}

console.log(new Foo());

function __new(Ctor, ...args){
    let obj = {};
    obj.__proto__ = Ctor.prototype;
    return Ctor.call(obj, ...args);
}
