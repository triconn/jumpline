require('babel-register')({})
// Webpack config file
const Path = require('path')
// Webpack and plugins
const Webpack = require('webpack')
// PostCSS Plugins
const Autoprefixer = require('autoprefixer')
const PreCSS = require('precss')

const ENV = process.env.NODE_ENV
const getJsBundle = require('../lib/utils.js').getJsBundle

// const NpmInstallPlugin = require('npm-install-webpack-plugin')

// Dev and Prod plugins
const plugins = [
  new Webpack.DefinePlugin({
    'process.env': {
      GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
      GOOGLE_CLIENT_SECRET: JSON.stringify(process.env.GOOGLE_CLIENT_SECRET),
      GOOGLE_REDIRECT_URL: JSON.stringify(process.env.GOOGLE_REDIRECT_URL),
      IQUEUE_API_URL: JSON.stringify(process.env.IQUEUE_API_URL),
      NODE_ENV: JSON.stringify(ENV || 'development'),
    },
  }),
]

// Prod-only plugins
if (ENV === 'production') {

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


module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.browser.js',
  ],
  output: {
    filename: getJsBundle(),
    path: Path.resolve(__dirname, '../../static/js'),
    publicPath: '/static/js/',
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
}
