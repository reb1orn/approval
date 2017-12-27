var path = require('path')
// 导入config index.js
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
// 配置合并工具
var merge = require('webpack-merge')
// 导入 webpack.base.conf
var baseWebpackConfig = require('./webpack.base.conf')
// 一个webpack 扩展，可以提取一些代码 并且将它们和文件分离开
// 如果我们想将webpack 打包成一个文件 css js 分离开，那么我们需要这插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 一个可以插入 html 并创建新的.html 文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.build.env
// 合并 webpack.base.conf
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 使用 loaders
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  // 是否使用 #source-map 开发工具
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // 编译输出目录
    path: config.build.assetsRoot,
    // 编译输出文件名称
    // 可以在hash 后面加 6 决定使用几位hash 值
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有制定输出名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    // 编译.vue 文件时 使用的 loader
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 使用插件
    // DefinePlugin 接受字符串插入到代码中，所以需要的话 可以写上 js 的字符串
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩  js css
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 将css 文件分离出来
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 输入输出 .html文件
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
