> 文章 [IIFE 2 Module 2 Babel](https://juejin.im/post/5cb9e563f265da03712999e8)

### AMD & requireJs

> 由于nodeJs的commonJs方案是同步执行的，在浏览器端会阻塞页面加载，所以AMD(Asynchronous Module Definition)

- 优势
  - 可以以函数的返回值作为模块的返回值，可以更好的实现API设计，Node中使用module.exports来实现。
  - 动态加载代码，异步加载。对于浏览器环境，更加适合。

- 劣势
  - 依赖注入的模式

### CMD & SeaJs

> 针对AMD规范可优化的部分，CMD应运而生，SeaJs是他的实现之一。

- 改进
  - CMD种去掉了AMD中依赖注入的模式，可以在模块内按需加载(if)。

- 劣势
  - 由于可用if加载，导致模块依赖关系不明确

### UMD

> 跨平台的模块解决方案

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('b'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (b) {
    // Use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));


// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```

### ES Module

> 语言层面的标准规范，未来浏览器也会支持这种写法，省去了很多打包加载等工作。

- 代码可静态分析
- 语法简洁
- 对循环引用支持更友好

### Babel-helper-module-transforms

> Babel  ES6 官方指定的编译器