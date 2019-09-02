'use strict'
const path = require('path')
const AutoDllPlugin = require('autodll-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const config = require('../config')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // main: ['babel-polyfill', './src/main']
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      api: resolve('src/api')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'happypack/loader?id=vue',
        include: [resolve('src')]
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=js',
        include: [resolve('src'), resolve('test'), resolve('/node_modules/vue2-org-tree/src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'vue',
      loaders: [
        {
          loader: 'vue-loader',
          options: vueLoaderConfig
        }
      ],
      threadPool: happyThreadPool,
      debug: true
    }),
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true'
        }
      ],
      threadPool: happyThreadPool,
      debug: true
    }),
    new HappyPack({
      id: 'css',
      loaders: [
        {
          loader: 'vue-style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            minimize: false
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'less',
      loaders: [
        {
          loader: 'vue-style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            minimize: false
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: [
          'vue/dist/vue.esm.js',
          'vue-router',
          'vuex',
          'vue2-org-tree',
          'vuedraggable',
          'qs',
          'axios',
          'js-cookie',
          'js-sha1',
          'iview'
        ],
        echarts: ['echarts']
      },
      plugins: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            },
            compress: {
              warnings: false
            }
          },
          sourceMap: false,
          parallel: true,
          cache: true
        })
      ]
    })
  ]
}
