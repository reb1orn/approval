// 使用config 、webpack 、
var config = require('../config')
var webpack = require('webpack')
// 使用wenpack 配置合并插件
var merge = require('webpack-merge')
// 使用一些小工具
var utils = require('./utils')
// 加载 webpack.base.conf
var baseWebpackConfig = require('./webpack.base.conf')
// 使用 html-webpack-plugin 插件 这个插件自动生成html 并且注入到.html文件中
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 将 热加载 Hot-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
// 将webpack.dev.config.js 和 webpack.base.config.js 配置进行合并
module.exports = merge(baseWebpackConfig, {
  module: {
    // 使用 styleLoaders
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // 使用 eval-source-map 模式作为开发工具。
  devtool: '#eval-source-map',
  plugins: [
    // DefinePlugin 接受字符串插入到代码中，所以你需要可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    // HotModule 插件在页面进行 变更的时候只会重回对应的页面模块，不会重绘整个html
    new webpack.HotModuleReplacementPlugin(),
    // 使用 HotModuleReplacementPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将 index.html 作为 入口 ，注入html代码后 生成index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ]
})
