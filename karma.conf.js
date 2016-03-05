'use strict';

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
webpackConfig.devtool = 'inline-source-map'
webpackConfig.plugins.concat(new webpack.IgnorePlugin(/ReactContext/))

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    files: [
      'test/**/*.spec.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'test/**/*.spec.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    }
  })
}
