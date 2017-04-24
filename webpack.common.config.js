const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const pxtorem = require('postcss-pxtorem');

//设置输入和输出根目录
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

//循环生成每个入口文件对应的html
const HtmlWebpack = [];
const modules = ['home', 'goodsClass',
  'cart', 'goodsDetail', 'login', 'order',
  'groupBuy', 'timeBuy', 'content', 'circle'
]
let entrys = {};
modules.forEach(module => {
  entrys[module] = `./src/modules/${module}`
});
modules.forEach((item, index) => {
  let chunks = ['commons', item];
  //动态生成html插件
  HtmlWebpack[index] = new HtmlWebpackPlugin({
    filename: `./${item}.html`, //生成的html存放路径，相对于 path
    template: `./src/pages/temp.html`,
    chunks: chunks,
    inject: true, //允许插件修改哪些内容，包括head与body
    hash: true, //为静态资源生成hash值
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    }
  })
});

const extractLess = new ExtractTextPlugin({
  filename: "[name].[hash].css"
});

//公共的插件
const commonPlugin = [
  new webpack.optimize.CommonsChunkPlugin({
    names: "commons",
    filename: "commons.[hash].js",
    minChunks: 2
  }),
  extractLess,
  new webpack.LoaderOptionsPlugin({
    // test: /\.less$/,
    options: {
      postcss: [pxtorem({
        rootValue: 100,
        propWhiteList: [
          'font-size',
          'font',
          'width',
          'height',
          'padding',
          'margin',
          'line-height',
          'letter-spacing',
        ],
      })]
    }
  }),
  //拷贝资源插件
  new CopyWebpackPlugin([{
    from: path.resolve(APP_PATH, 'assets'),
    to: path.resolve(BUILD_PATH, 'assets')
  }]),
]

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, './src/assets/svg'), // 2. 自己私人的 svg 存放目录
];

module.exports = {
  entry: entrys,
  output: {
    path: BUILD_PATH,
    filename: "[name].[hash].js",
  },
  module: {
    rules: [{
        test: /\.js$/, //用babel编译jsx和es6
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        use: extractLess.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'postcss-loader'],
        })
      }, {
        test: /\.svg$/i,
        use: 'svg-sprite-loader',
        include: svgDirs
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/, //处理css文件中的背景图片
        use: 'url-loader?limit=1&name=./static/assets/[name].[hash:4].[ext]'
        //当图片大小小于这个限制的时候，会自动启用base64编码图片。减少http请求,提高性能
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "./src"),
      "node_modules"
    ],
    extensions: ['.web.js', '.js', '.less', '.jsx', '.json'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      'container': path.resolve('./src/container'),
      'commonComponent': path.resolve('./src/common/components'),
      'common': path.resolve('./src/common'),
      'baseComponent': path.resolve(__dirname, './src/base-components'),
      'assets': path.resolve(__dirname, './src/assets'),
      'styles': path.resolve(__dirname, './src/styles'),
      'svg': path.resolve(__dirname, './src/assets/svg')
    }
  },
  externals: {
    // 'react': 'react'
  },
  plugins: HtmlWebpack.concat(commonPlugin)
}
