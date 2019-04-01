## Babel

> 转码器，对ES6,JSX,TS等语法做转换

#### 工作原理

babel转码过程分为三个阶段

1. parsing
2. transforming
3. generating

```flow
start=>start: ES6高级语法输入
babylon=>operation: babylon解析
AST1=>operation: AST语法树
plugin=>operation: Plugins 队列执行AST转译
AST2=>operation: 新的 AST
generate=>operation: Babel-generator
ES5=>end: ES5

start->babylon->AST1->plugin->AST2->generate->ES5
```



#### @babel/core

> 根据配置文件转换代码，控制plugins和presets的执行

- `.babelrc` 静态文件
- `babel.config.js` 可编程

#### Plugins和Presets

> babel基于插件架构，转码时会根据配置文件中的配置查找相应插件作为转码工具，想使用哪种语法就要安装(声明)相应的插件，使用比较繁琐
>
> presets是逆序执行 @babel/preset- 可省略不写
>
> plugins是正序执行 @babel/plugin- 可省略不写
>
> 同时设置了presets和plugins，那么plugins的先运行

```shell
# .babelrc
{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "其他插件",
    "@babel/preset-react",
  ]
}
```

> presets 提供一系列的插件集合或者语言环境，通过声明preset可以直接转码一系列的语法，省去了逐个安装插件的麻烦

```shell
/* .babelrc */
{
  "presets": ["@babel/preset-env"]
}
```

##### preset-env

> babel预设库，默认可以对最新的 JavaScript语法做转换，默认情况下不用做配置，需要时也可对浏览器环境做配置。
>
> 可配置以控制polyfill和runtime的使用

```shell
{
  presets: [
    [
      "@babel/preset-env", {
        "targets": "ie >= 8"
      }
    ]
  ]
}
```

##### @babel/polyfill

> 对core-js和regenerator的再封装
>
> api填充胶囊，babel转换器只能对语法做转化，但是新增的api不能直接被转换，例如：Promise Set Symbol 等等..，所以我们需要使用
>
> `babel/polyfill` 来填充新api语法
>
> 通过向全局对象和内置对象的prototype上添加方法来实现

但是polyfill中包含所有的新api，如果我们只需要用其中某一个或针对浏览器做优化呢？`preset-env` 插件提供了这个按需引入的功能，我们可以修改 `preset-env` 的[配置](<https://babeljs.io/docs/en/babel-preset-env>)

我们只需给`preset-env`添加一个`useBuiltIns`配置项即可，值可以是`entry`和`usage`

- entry 会在入口处把所有ie8以上浏览器不支持api的polyfill引入进来

- usage，它会扫描你的代码，只有你的代码用到了哪个新的api，它才会引入相应的polyfill，`but 这个功能还处于试验状态，谨慎使用`

```shell
/* .babelrc */
{
  "presets": [
    ["@babel/preset-env", { 	# @babel/preset- 可以省略，常见直接写为 env
      "modules": false, 			# 转换moduleType amd umd commonjs等
      "useBuiltIns": "usage", # 扫描你的代码，按需加载polyfill
      "targets": "ie >= 8"
    }]
  ]    
}
```

#### @babel/runtime`<plugins>`

> 对core-js和regenerator的再封装
>
> 为一些特殊语法提供运行时helper函数，比如转换es6的class，因为转换时会在每个使用特殊语法的地方生成一个帮助函数，这会造成很大的体积浪费，这个插件为这些帮助函数提供了一个公共的地方。因此，此插件可以进一步压缩代码体积。

```shell
/* .babelrc */
{
	# 添加预设插件集, 在编译时是按逆序执行
  "presets": [ 	
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "usage",
      "targets": "ie >= 8"
    }]
  ],
  # 添加runtime插件, plugins在编译时是按顺序执行
  "plugins": [
    "@babel/plugin-transform-runtime" 	# @babel/plugin- 也是可省略的，常见直接写为 transform-runtime
  ]
  # !!! 同时设置了 presets和plugins plugins优先执行
}
```

> runtime插件还有一个重要的功能，就是为代码创建一个sandbox environment(沙箱环境)，这在编写一些公共类库时非常重要(就像Vue会修改Array上的方法，如果引入了polyfill势必会产生污染)。例如我们在引用polyfill时候，会全局的引入这些新的Api，这样可能会影响了我们对某些共工类原型的修改。那使用这个插件就会给引用的polyfill创建一个沙箱环境，从而不会影响到外部环境

需要配置 `core-js`，也需要安装 `@babel/runtime-corejs2` 这个依赖包。transform-runtime 依赖babel-runtime(依赖 core-js)，transform-runtime 是为了解决babel-runtime过大的问题，可实现按需加载，减少代码体积

```shell
/* .babelrc */

{
  "presets": [ 
    ["@babel/preset-env", {
      "modules": false,
      "targets": "ie >= 8"
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2 # 指定版本
    }]
  ]
}
```

#### 浏览器兼容性配置

- package.json 中可以对当前项目的浏览器环境进行相应配置 [可配置浏览器列表](<https://github.com/browserslist/browserslist#queries>)

```json
 "browserslist": [
    "> 1%",
    "last 2 versions",
    "Android >= 3.2", 
    "Firefox >= 20", 
    "iOS 7"
  ]
```

- .babelrc

```shell
{
 "presets": [
   ["@babel-preset-env", {
     "targets": {
       "browsers": ["last 2 versions"], # 每个浏览器的最后两个版本
       "node": "current"
     },
   }]
 ]
}
```

#### 参考资料

[史上最清晰易懂的babel配置解析](<https://juejin.im/post/5ca0c6e8e51d4501903dc886>)

[babel使用详解](<https://juejin.im/post/5c0f39526fb9a04a0e2d09da>)

