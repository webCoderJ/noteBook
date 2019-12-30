/**
 * webpack 模块分析
 *
 * 由于浏览器不支持 es-module、commonjs 等模块机制
 * 所以webpack需要将模块处理为浏览器能识别的方式（使用最古老的js实现）
 *
 * 1. 将每个模块使用「模块初始化函数」包裹
 * 2.
 */

/**
 * 模块初始化函数
 *
 * @example
 * // index.js
 * import { deepClone } from "lodash";
 * import '../../common'
 * documnet.write(deepClone);
 *
 * 以上模块会被打包为
 */

(function() {
  "use strict";
  __webpack.require__.r(__webpack__exports);
  /* harmony import */ 
  var _common_WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1); // module - id = 1

  /* harmony import */ 
  var _lodash_WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2); // module - id = 2

  document.write(Object(lodash_WEBPACK_IMPORTED_MODULE_1__["deepClone"])());
})();

/**
 * 模块的加载机制
 * 
 * __webpack_require__
 */
(function(modules) {
  // 记录已经加载的模块
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false, // 是否已经load
      exports: {}
    });
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  // 初始化模块 0
  __webpack_require__(0);
})([
  /* 0 module */
  function(module, __webpack__exports, __webpack_require__) {},
  /* 1 module */
  function(module, __webpack__exports, __webpack_require__) {}
]);
