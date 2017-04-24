const path = require('path');
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
let config = require('./webpack.common.config')

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

config.plugins = [
  ...config.plugins,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  //每次运行webpack清理上一次的文件夹
  new CleanPlugin([BUILD_PATH]),
  //压缩混淆JS插件,UglifyJsPlugin 将不再支持让 Loaders 最小化文件的模式。debug 选项已经被移除。Loaders 不能从 webpack 的配置中读取到他们的配置项。
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    },
    comments: false,
    beautify: false
  })
]

module.exports = config
