var path = require('path');
var express = require('express');
var proxyMiddleware = require('http-proxy-middleware')

require('./api/api.js')
var app = express()

app.use(express.static(path.join(__dirname, '/dist/')))
var proxyTable = {
     // 全局
     "/api-org": {
        target:  global.ip ,
        changeOrigin: true,
    },
    '/api-auth': {
        target:  global.ip ,
        changeOrigin: true,
    },
    '/api-push': {
        target:  global.ip,
        changeOrigin: true,
    },
    '/api-system': {
        target: global.ip ,
        changeOrigin: true,
    },
    '/api-user': {
        target:   global.ip ,
        changeOrigin: true,
    },
    '/app': {
        target:  global.minIp + ':' + global.minport,
        changeOrigin: true,
    },
    //上传
    '/api/file': {
        target: "https://" + global.uploadIp,
        changeOrigin: true,
    },
    // '/book': {
    //     target: "http://192.168.1.253:8080",
    //     changeOrigin: true,
    // }
}

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(context, options))
})
// server.listen(port);
app.listen(2413, function () {
    console.log('server start 2413')
})
