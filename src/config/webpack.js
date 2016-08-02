import Path from 'path'
import { loadDotEnv } from '../lib/utils.js'
// Webpack and plugins
import Webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import OfflinePlugin from 'offline-plugin'
// PostCSS Plugins
import Autoprefixer from 'autoprefixer'
import PreCSS from 'precss'

loadDotEnv()

const ENV = process.env.NODE_ENV || 'development'

// Dev and Prod plugins and settings
const publicPath = '/static/'

const entry = {
  // 'build/server': './src/index.bootstrap.server.js',
  // 'build/client': './src/index.browser.js',
  vendor: [
    'debug',
    'immutable',
    'jquery',
    'key-mirror',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'react-tap-event-plugin',
    'redux',
    'redux-thunk',
    'superagent',
  ],
  bootstrap: 'bootstrap-loader',
  bundle: './src/index.browser.js',
}
const plugins = [
  // In case NODE_ENV is not defined, have default
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENV || 'development'),
    },
  }),
  new Webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  }),
  new Webpack.EnvironmentPlugin([
    'GOOGLE_CLIENT_ID',
    'GOOGLE_REDIRECT_URL',
    'JUMPLINE_API_URL',
  ]),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|css|json|ico|map|xml|txt|svg|eot|ttf|woff|woff2)$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  new CopyWebpackPlugin([
    { from: 'static/images/favicon.ico' },
    { from: 'static/robots.txt' },
  ]),
  new Webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    minChunks: Infinity,
  }),
  new AssetsPlugin({
    filename: '/build/assets.json',
  }),
  // new Webpack.IgnorePlugin(/./, /^lab$/),
]

// Prod-only plugins
if (ENV === 'production') {

  // publicPath = 'https://assets-prod.jumpline.me/'
  // plugins.push(
  //   new S3Plugin({
  //     // Exclude uploading of html
  //     exclude: /.*\.html$/,
  //     // s3Options are required
  //     s3Options: {
  //       accessKeyId: process.env.AWS_ACCESS_KEY,
  //       secretAccessKey: process.env.AWS_SECRET_KEY,
  //       region: 'us-east-1',
  //     },
  //     s3UploadOptions: {
  //       Bucket: process.env.AWS_BUCKET,
  //     },
  //     // cdnizerOptions: {
  //     //   defaultCDNBase: 'http://asdf.ca',
  //     // },
  //   })
  // )
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

// Dev-only plugins
if (ENV === 'development') {

  const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  // const NpmInstallPlugin = require('npm-install-webpack-plugin')
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
plugins.push(
  new OfflinePlugin({
    publicPath: '/',
    relativePaths: false,
    caches: {
      main: [
        // '/',
        '*.{css,eot,ico,jpg,jpeg,js,json,png,svg,ttf,txt,woff,woff2,}',
      ],
    },
    externals: [
      // '/',
    ],
    rewrites: (asset) => {

      return asset === '/' ? asset : `/static/${asset}`

    },
  })
)

module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    path: './build/',
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
