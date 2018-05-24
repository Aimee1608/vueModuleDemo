
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const dirArr = path.dirname(__dirname).split(path.sep)
const CDN = [12, 13, 14, 16, 17, 18]
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/' + process.argv[2] + '/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/' + process.argv[2]),
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'http://res' + CDN[Math.floor(Math.random() * 6)] + '.xesimg.com/x5home/' + process.argv[2] + '/',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    index: process.argv[2],
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '**': {
      //   target: 'http://i.xueersi.com/',
      //   changeOrigin: true,
      //   filter: function (pathname, req) {
      //     let proxyApi = /^((\/study\/)|(\/WrongTestsNew\/)|(\/libarts\/)|(\/science\/)|(\/MyCourses?\/)|(\/GoldShop\/)|(\/PaperSetsNew\/)|(\/CourseTests\/))/
      //     let fileReg = /((\.js)|(\.css)|(\.img)|(\.html)|(\.svg)|(\.png)|(\.jpg)|(\.jpeg)|(\.gif)|(\.pdf)|(\.json)|(\.woff))$/ig
      //     if (fileReg.test(pathname)) return false
      //     if (proxyApi.test(pathname)) return true
      //     return false
      //   }
      // }
      // '/study': {
      //   target: 'http://i.xueersi.com/study/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/study': '/'
      //   }
      // },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
