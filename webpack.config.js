'use strict';

const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV
const DEV = env === 'development'

const webpackConfig = {
    devtool: DEV ? 'cheap-module-eval-source-map' : null,
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: DEV ? 'http://localhost:3000/' : ''
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${ env }"`
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: false
        }),
        new CopyWebpackPlugin([
            {from: 'public/ajax', to: 'ajax'},
            {from: 'public/img', to: 'img'}
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            }
        ]
    }
}

// ------------------------------------
// Plugins
// ------------------------------------
if (env === 'development') {
  console.log('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.entry.push('webpack-hot-middleware/client')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  console.log('Enable plugins for production (OccurenceOrder, Dedupe, HtmlWebpack & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/build_template.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Styles{
let lessConfig = {
    test: /\.less$/,
    include: __dirname
}

if(DEV) {
    lessConfig.loaders = [
        'style',
        'css?sourceMap',
        'postcss',
        'less?sourceMap'
    ]
} else {
    lessConfig.loader = ExtractTextPlugin.extract(
        'style',
        'css!postcss!less'
    )
}

webpackConfig.module.loaders.push(lessConfig)

webpackConfig.postcss = [
  cssnano({
    sourcemap: DEV ? true : false,
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['iOS >= 7', 'Safari >= 6', 'Chrome >= 40']
    },
    safe: true,
    discardComments: {
      removeAll: true
    }
  })
]

webpackConfig.module.loaders.push(
    {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name]-[hash].[ext]"
    },
    {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
    }
)

module.exports = webpackConfig
