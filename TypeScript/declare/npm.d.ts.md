> 在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在

1. 存在于 npm 包中，并通过 package.json 的 types 或 typings 字段指定声明文件路径 `推荐`
2. 发布到 `@types`，不过在使用包的时候需要 `npm install @types/foo --save-dev`

> 假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。
> 由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：

1. node_modules/@types/foo/index.d.ts `不推荐`
2. 创建 types 目录，`types/{module}/index.d.ts`

```bash
├── src
|  └── index.ts
├── types
|  └── {module}
|     └── index.d.ts
└── tsconfig.json
```

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
    	"*": ["types/*"]
  	}
  }
}
```

#### npm包导出声明文件的方式

- export
- export namespace
- export default
- export = commonjs

##### 自动生成声明文件

如果库的源码本身就是由 ts 写的，那么在使用 `tsc`脚本将 ts 编译为 js 的时候，添加 `declaration`选项，就可以同时也生成 `.d.ts`声明文件了

我们可以在命令行中添加 `--declaration`（简写 `-d`），或者在 `tsconfig.json`中添加 `declaration`选项。这里以 `tsconfig.json`为例：

```json
{
  "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib", // 编译输出目录
        "declaration": true, // 将 .d.ts 输出到 outDir
    		"declarationDir": "./types", // 声明文件输出目录
    		"declarationMap": true, // 是否生成.d.ts.map（sourcemap）
    		"emitDeclarationOnly": true // 只生成 .d.ts
    }
}
```

