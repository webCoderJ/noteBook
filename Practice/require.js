function require(/* ... */) {
    const module = { exports: { a: 1 } };
    ((module, exports) => {
        console.log("TCL: require -> exports", exports);
        // Module code here. In this example, define a function.
        // 模块代码在这里，在这个例子中，我们定义了一个函数
        function someFunc() {}
        exports = someFunc;
        // At this point, exports is no longer a shortcut to module.exports, and
        // this module will still export an empty default object.
        // 当代码运行到这里时，exports 不再是 module.exports 的引用，并且当前的
        // module 仍旧会导出一个空对象(就像上面声明的默认对象那样)
        // module.exports = 1;
        // At this point, the module will now export someFunc, instead of the
        // default object.
        // 当代码运行到这时，当前 module 会导出 someFunc 而不是默认的对象
    })(module, module.exports);
    console.log("TCL: require -> module.exports", module);
    return module.exports;
}
require();

(function(exports, require, module, __filename, __dirname) {
    // Module code actually lives in here
});
