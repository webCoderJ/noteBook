let path = require("path");
let webpack = require("webpack");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ProgressBarPlugin = require("progress-bar-webpack-plugin");
let PostCSSLoder = require("postcss-loader");
let PostCSSPluginAutoPrefixer = require("autoprefixer");
let HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

let config = {
  mode: 'none',
  devtool: "sourcemap",
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
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundel.[name].[hash:8].js"
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
          /* 
            3. style-loader
            css-in-js   ->   在运行时将css作为style标签内容插入到head中, 与提取文件插件冲突
          */
          MiniCssExtractPlugin.loader,
          // 2. css         ->   css-in-js
          "css-loader",
          // 1. sass        ->   css
          "sass-loader",

          /* post-css */
          {
            loader: "postcss-loader",
            options: {
              plugins: [PostCSSPluginAutoPrefixer]
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 10240,
              name: "[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|otf|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /* 展示打包进度 */
    new ProgressBarPlugin(),

    /* 清理dist目录 */
    new CleanWebpackPlugin(),

    /* 提取Css文件 */
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].css"
    }),

    /* scope-hoising */
    new webpack.optimize.ModuleConcatenationPlugin(),

    /* 外部插件 */
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://unpkg.com/react@16.12.0/umd/react.production.min.js",
          global: "React",
          append: true
        },
        {
          module: "react-dom",
          entry: "https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js",
          global: "ReactDOM",
          append: true
        },
      ]
    }),

    /* 将打包的文件引用到index.html */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "public/index.html")
    })
  ]
};

module.exports = config;
