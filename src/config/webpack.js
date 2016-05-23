'use strict'
// require('babel-register')({})
require('dotenv').config()
// Webpack config file
const Path = require('path')
// Webpack and plugins
const Webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
// const OfflinePlugin = require('offline-plugin')
const S3Plugin = require('webpack-s3-plugin')
// PostCSS Plugins
const Autoprefixer = require('autoprefixer')
const PreCSS = require('precss')

const ENV = process.env.NODE_ENV || 'development'


// Dev and Prod plugins and settings
let publicPath = '/static/dist/'

const entry = {
  // 'build/server': './src/index.bootstrap.server.js',
  // 'static/dist/bundle': './src/index.browser.js',
  bundle: './src/index.browser.js',
  vendor: [
    'immutable',
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
  ],
}
const plugins = [
  new AssetsPlugin({
    filename: '/src/config/assets.json',
  }),
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENV || 'development'),
    },
  }),
  new Webpack.EnvironmentPlugin([
    'GOOGLE_CLIENT_ID',
    'GOOGLE_REDIRECT_URL',
    'IQUEUE_API_URL',
  ]),
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
  // new Webpack.IgnorePlugin(/./, /^lab$/),
]

// Prod-only plugins
if (ENV === 'production') {

  publicPath = 'https://assets-prod.jumpline.me/'
  plugins.push(
    new S3Plugin({
      // Exclude uploading of html
      exclude: /.*\.html$/,
      // s3Options are required
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: 'us-east-1',
      },
      s3UploadOptions: {
        Bucket: process.env.AWS_BUCKET,
      },
      // cdnizerOptions: {
      //   defaultCDNBase: 'http://asdf.ca',
      // },
    })
  )
  plugins.push(
    new Webpack.optimize.OccurenceOrderPlugin()
  )
  plugins.push(
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  )

}

if (ENV === 'production' && /staging/.test(process.env.AWS_BUCKET)) {

  publicPath = 'https://assets-staging.jumpline.me/'

}

// Dev-only plugins
if (ENV === 'development') {

  const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  const WebpackShellPlugin = require('webpack-shell-plugin')
  // const NpmInstallPlugin = require('npm-install-webpack-plugin')
  plugins.push(
    new WebpackShellPlugin({
      dev: false,
      verbose: true,
      onBuildStart: ['npm start > server.log'],
    })
  )
  plugins.push(
    new BrowserSyncPlugin({
      proxy: 'localhost:8000',
      ghostMode: false,
    })
  )
  // plugins.push(
  //   new NpmInstallPlugin(),
  // )

}

// Keep OfflinePlugin last
// plugins.push(
//   new OfflinePlugin({
//     publicPath,
//     relativePaths: false,
//   })
// )

module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    // path: Path.resolve(__dirname, '../../static/dist'),
    path: './static/dist/',
    publicPath,
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: ENV === 'development',
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&camelCase'
          + '&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Configure loading font files, svg, etc
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  // node: {
  //   child_process: 'empty',
  //   dns: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tap: 'empty',
  //   tls: 'empty',
  // },
  postcss: function postcss () {

    return [
      Autoprefixer,
      PreCSS,
    ]

  },
  resolve: {
    root: [
      Path.resolve('../../src'),
    ],
  },
  sassConfig: {
    precision: 8,
  },
  // target: 'node',
}
