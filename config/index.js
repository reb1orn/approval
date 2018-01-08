// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
require("../api/api");
module.exports = {
    // production 环境
    build: {
        // 使用 prod.env 中定义的编译环境
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        // 编译输出的静态资源根路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 编译输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布上线路径的根目录，可配置为资源服务器域名或CDN域名
        assetsPublicPath: '/',
        // 是否开启 gzip
        productionGzip: false,
        // 需要使用 gsip 压缩的文件扩展名
        productionGzipExtensions: ['js', 'css']
    },
    // dev环境
    dev: {
        // 使用 dev.env 中定义的编译环境
        env: require('./dev.env'),
        // 进行测试页面的端口
        port: 2413,
        // 编译 输出的二级目录
        assetsSubDirectory: 'static',
        // 编译发布线上的根目录 可以自定义
        assetsPublicPath: '/',
        proxyTable: {
            //全局
            '/api-org': {
                target: "http://" + global.ip + ":" + global.port,
                changeOrigin: true,
            },
            '/api-auth': {
                target: "http://" + global.ip + ":" + global.port,
                changeOrigin: true,
            },
            '/api-push': {
                target: "http://" + global.ip + ":" + global.port,
                changeOrigin: true,
            },
            '/api-system': {
                target: "http://" + global.ip + ":" + global.port,
                changeOrigin: true,
            },
            '/api-user': {
                target: "http://" + global.ip + ":" + global.port,
                changeOrigin: true,
            }, 
            '/api-approval': {
                target: "http://" + global.ip + ":" + global.port,
                changeOrigin: true,
            },
            '/column/get': {
                target: "http://" + global.messageIp + ":" + global.messagePort,
                changeOrigin: true,
            }, 
            '/content/get': {
                target: "http://" + global.messageIp + ":" + global.messagePort,
                changeOrigin: true,
            }, 
            // '/approval/list': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/getSetItem': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/saveSetItem': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/updateProcess': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/deleteProcess': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/copy/get': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/copy/save': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/cdn/save': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/cdn/delete': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/approval/cdn/get': {
            //     target: "http://" + global.approveIp + ':' + global.approvePort,
            //     changeOrigin: true,
            // },
            // '/employee/get': {
            //     target: "http://" + global.minIp + ':' + global.minport,
            //     changeOrigin: true,
            // },
            '/dept/getOrgTreeAndUser': {
                target: "http://" + global.minIp + ':' + global.minport,
                changeOrigin: true,
            },
            // '/oauth/token': {
            //     target: "http://android:android@" + global.ip + ":" + global.port,
            //     changeOrigin: true,
            // },
            //上传
            '/api/file': {
                target: "https://" + global.uploadIp,
                changeOrigin: true,
            },
        },
        // 是否开启 cssSourceMap
        cssSourceMap: false
    }
}