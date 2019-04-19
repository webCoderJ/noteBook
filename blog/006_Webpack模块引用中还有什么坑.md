大家都知道(如果暂时还不清楚的可以[戳这里>>](<https://juejin.im/post/5b7d2f45e51d4538826f4c28>))，`umd`格式是跨平台的模块解决方案，node和浏览器的兼容写法，但直接在node中使用还是存在问题的：

### 问题复现

最近在引用自己写的一个插件的时候，偶然发现webpack下引用 `node_modules`下的文件与直接引用文件夹中的文件表现不一致。文件内容都是由webpack打包出的同一个文件 `umd.js`，从`node_modules` 引入的可以直接使用，但是从`普通文件夹中`引入的文件在浏览器中会报错，到底是什么原因？？是人性的扭曲还是道德的沦丧？？

#### 问题详细描述

```js
  // vue.config.js
  let config = {
      baseUrl: process.env.NODE_ENV === "production" ? "/ele-multi-cascader/" : "/",
  
      configureWebpack: {
          output: {
              libraryExport: "default"
          }
      }
  };
  
  module.exports = config;
  
  // babel.config.js
  module.exports = {
    presets: [
      ["@vue/app", {
        useBuiltIns: "usage"
      }]
    ]
  };
  
  // cli3 构建命令 --target lib 构建符合umd规范产出
  // vue-cli-service build --name cascader --entry ./src/index.js --target lib --mode production
```
构建截图：

![](https://user-gold-cdn.xitu.io/2019/4/19/16a3499e50444950?w=511&h=214&f=png&s=29313)

为了排除`cli3`插件的干扰，我使用`cli2`的`vue`项目也进行了尝试，表现都是一致的！

```js
// 成功
import Vue from 'vue'

import eleMultiCascader from "../node_modules/ele-multi-cascader/dist/cascader.umd";

import eleMultiCascader from "ele-multi-cascader/dist/cascader.umd";

import eleMultiCascader from "ele-multi-cascader";

let eleMultiCascader = require("../node_modules/ele-multi-cascader/dist/cascader.common");

let eleMultiCascader = require("ele-multi-cascader/dist/cascader.umd");

let eleMultiCascader = require("ele-multi-cascader");


// 失败
import eleMultiCascader from "../dist/cascader.common";

let eleMultiCascader = require("../dist/cascader.umd")

// 在页面直接引用
// <script src="./cascader.umd.js"></script>
```

初步表现为，只要是从`node_modules`中引入的文件，都可以正常使用。

- 引用成功的都顺利打印出了插件对象，看起来是这么美好…

![](https://user-gold-cdn.xitu.io/2019/4/19/16a349a2049b12a0?w=922&h=170&f=png&s=36960)

- 引用失败车祸现场

![](https://user-gold-cdn.xitu.io/2019/4/19/16a349b823377daa?w=1164&h=744&f=png&s=249652)

点进去发现是`Vue`是`undefined`，WTF?

![](https://user-gold-cdn.xitu.io/2019/4/19/16a349ab1c7d594e?w=240&h=226&f=png&s=77791)

![](https://user-gold-cdn.xitu.io/2019/4/19/16a349a7472c079d?w=836&h=580&f=png&s=112247)

### How to resolve？

最开始一直认为是node的`模块引用机制`导致的问题，后来再次仔细了解了相关规范，`node`支持的是`commonJs`，而`umd`是兼容`commonJs`的所以跟node的`模块机制`没有关系。

睡午觉的时候还在想这个问题，经过以上的种种表现可以推测，只能是`webpack`打包导致的问题。`umd`这种兼容语法在`node`环境中直接`require`是不能直接使用的，如果要正常使用，必须要通过转码。嗯，转码！！

是谁负责转码呢？肯定是`Babel`了，只是不知道具体用的哪个插件。到这里问题已经解决了 90% 了。

#### plugin-transform-modules

打开`node_modules`的`@babel`文件夹可以看到关于模块转换的几个插件！

![](https://user-gold-cdn.xitu.io/2019/4/19/16a349c553de75fb?w=339&h=110&f=png&s=19795)

真相已经很明确了，就是这个 [plugin-transform-modules-umd](https://babeljs.io/docs/en/next/babel-plugin-transform-modules-umd.html) ，`babel` 会默认对`node_modules`中引入的文件做相应规范的转码，而别的文件夹不会，除非你手动配置。

打开官网可以看到一系列的介绍，就不做文档搬运了，粗暴的在项目中配置了一下。

```js
// babel.config.js
module.exports = {
    presets: [
        [
            "@vue/app",
            {
                useBuiltIns: "usage"
            }
        ]
    ],
    // here
    plugins: ["@babel/plugin-transform-modules-umd"]
}

// main.js
import eleMultiCascader from "../dist/cascader.common";
console.log("TCL: eleMultiCascader", eleMultiCascader)
```

怀着激动的心情运行了下 `yarn serve`，终于在控制台看见了清爽的一幕！问题成功解决。

![](https://user-gold-cdn.xitu.io/2019/4/19/16a349a2049b12a0?w=922&h=170&f=png&s=36960)

### 结语

平时在繁忙的搬砖中可能都没遇到这个问题，关心的最多的可能也只是`babelrc`的配置方法。熟练的使用着cli工具，安静地当着`配置工程师`。cli固然是提升效率的法宝，但是在使用他们的时候应该去想想它背后都有些工具在默默地支持，不要求深入地了解每个细节，但是大致的架构，运行原理的了解是很有必要的。有了这些架构和原理的指引，以后遇到任何问题也不会像一个无头苍蝇，无从下手…。至少有个方向，方向对了也就意味着离真相不远了！

好了，这次踩坑与大家共勉！如果发现说的不对的地方，欢迎指正！

最后再无耻地打个广告，主角就是上面引出问题的那个插件，一个基于`ElementUI`的`多选级联选择器`。欢迎使用，欢迎 `Start` [链接在此>>](<https://github.com/webCoderJ/ele-multi-cascader>)，逃~

