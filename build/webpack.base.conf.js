// 使用 nodejs 自带的文件路径插件
var path = require('path')
// 引入 config/index.js文件
var config = require('../config')
// 引入小工具
var utils = require('./utils')
// 拼接工作区路径为一个绝对路径
var projectRoot = path.resolve(__dirname, '../')
// ie环境编译vuex
require("babel-polyfill")
//  将 nodejs 环境作为我们的编译环境
var env = process.env.NODE_ENV
// 是否在 dev 环境下开启cssSourceMap， 可以在config/index.js中进行配置
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
// 是否在 production 环境下开启cssSourceMap，可以在config/index.js中进行配置
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
// 最终是否使用 cssSourceMap
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

// 在开头引入webpack，后面的plugins那里需要
var webpack = require('webpack')

module.exports = {
  entry: {
    // 编译 文件入口
    app: './src/main.js'
  },
  output: {
    // 编译输出的根路径
    path: config.build.assetsRoot,
    // 正式发布环境下编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // 编译输出的文件名
    filename: '[name].js'
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['', '.js', '.vue', '.json'],
    // 不进行自动补全或处理的文件或者文件夹
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'juery': 'jquery'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  // 增加一个plugins
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    // preLoaders:[] 预处理
    loaders: [
      // 处理文件以及loader
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    //  代码检查配置工具
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    // .vue 文件配置 loader 以及工具autoprefixer
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
