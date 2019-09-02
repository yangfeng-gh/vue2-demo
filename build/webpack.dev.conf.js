'use strict'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config/')
const utils = require('./utils')
const webpackBaseConfig = require('./webpack.base.conf.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// add hot-reload related code to entry chunks
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
  webpackBaseConfig.entry[name] = ['./build/dev-client'].concat(webpackBaseConfig.entry[name])
})

module.exports = merge(webpackBaseConfig, {
  module: {
    // rules: utils.styleLoaders({
    //   sourceMap: config.dev.cssSourceMap
    // })
    rules: [
      {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
        include: [resolve('src'), resolve('/node_modules/vue2-org-tree/src'), resolve('/node_modules/iview/src')]
      },
      {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [resolve('src'), resolve('/node_modules/vue2-org-tree/src'), resolve('/node_modules/iview/src')]
      }
    ]
  },
  // devtool: '#cheap-module-eval-source-map',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template/index.ejs',
      favicon: path.resolve('favicon.ico'),
      inject: true
    }),
    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.dev.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ]),
    new FriendlyErrorsPlugin()
  ]
})
