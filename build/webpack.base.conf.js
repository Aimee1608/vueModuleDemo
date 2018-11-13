'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const enterdir = process.argv.splice(2)[0]
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: './module/' + enterdir + '/src/main.js'
    // vendor: ['element-ui', 'axios']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      //设置绝对路径 ? 'http://res' + CDN[Math.floor(Math.random() * 6)] + '.manogyaimg.com/' + enterdir + config.build.assetsPublicPath
      : config.dev.assetsPublicPaths
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.html'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../module', enterdir, 'src'),
      '~common': path.join(__dirname, '../common'),
      'common': path.join(__dirname, '../common')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test'), resolve('module')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('module'), resolve('common')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('../static/fonts/[name].[ext]?v=[hash:7]')
        }
      }
    ]
  }
}
