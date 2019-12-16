let path = require("path");
let webpack = require("webpack");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ProgressBarPlugin = require("progress-bar-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  mode: "development",
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 9000,
    open: false
  },
  entry: {
    main: "./src/index.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "..", "src/")
    }
  },
  output: {
    filename: "bundle.[name].[hash:8].js",
    path: path.resolve(__dirname, "..", "/dist")
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader", // 3. css-in-js   ->   在运行时将css作为style标签内容插入到head中
          "css-loader", // 2. css         ->   css-in-js
          "sass-loader" // 1. sass        ->   css
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|otf|ttf)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    /* 构建进度 */
    new ProgressBarPlugin(),

    /* 热替换 */
    new webpack.HotModuleReplacementPlugin(),

    /* 清理dist目录 */
    new CleanWebpackPlugin(),

    /* 提取CSS */
    new MiniCssExtractPlugin({
      // filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].css"
    }),

    /* 将打包的文件引用到index.html */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "public/index.html")
    })
  ]
};

module.exports = config;
