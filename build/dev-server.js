//检查 node 和 nom 版本
require('./check-versions')()
//获取 config 的默认配置
var config = require('../config')
//如果node 的环境无法判断当前的 dev product 环境
//使用config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// 使用node自带的文件路径工具
var path = require('path')
//使用express
var express = require('express')
//使用webpack
var webpack = require('webpack')
//一个可以强制打开浏览器并跳转到指定url的插件
var opn = require('opn')
//使用proxyTable
var proxyMiddleware = require('http-proxy-middleware')
//使用dev环境的 webpack
var webpackConfig = require('./webpack.dev.conf')
//如果没有指定运行端口，使用config.dev.port 作为运行端口
var port = process.env.PORT || config.dev.port
//使用config.dev.proxyTable作为proxyTable的代理配置
var proxyTable = config.dev.proxyTable
//启动服务
var app = express()
//启用webpack进行编译
var compiler = webpack(webpackConfig)
//启动webpack-dev-middleware，将 编译后的文件暂存在内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
// 启动webpack-hot-middleware 也就是我们常说的 热加载 Hot-reload
var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
// 将 proxyTable 中的请求 配置挂载到启动的express服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// 使用 connect-history-api-fallback 匹配资源，如果 不匹配就可以重定向到指定的地址
app.use(require('connect-history-api-fallback')())

// 将暂时在内存中 webpack 编译后的文件挂载到express 服务上
app.use(devMiddleware)
// 将热加载 挂载到 express服务上
app.use(hotMiddleware)
// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 为静态资源提供服务
app.use(staticPath, express.static('./static'))
// 让express 服务监听 port 的请求，并且将此服务作为dev-server.js 的借口暴露
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // 如果不是测试环境，自动打开浏览器并调到我们的开发环境
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
