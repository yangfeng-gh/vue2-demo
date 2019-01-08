'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  cssModules: {
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    camelCase: true
  },
  loaders: utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction,
    modules: true,
    importLoaders: 1,
    localIdentName: '[hash:base64]'
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
