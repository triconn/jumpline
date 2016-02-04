require('babel-register');
// Webpack config file
const Path = require('path');
const Webpack = require('webpack');
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const getJsBundle = require('../lib/utils.js').getJsBundle();
//const NpmInstallPlugin = require('npm-install-webpack-plugin');

// Setup env configs
var envConfig = {};

if (process.env.NODE_ENV === 'development') {
  envConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:8000',
      'webpack/hot/only-dev-server',
      // 'webpack-hot-middleware/client',
      './src/index.browser.js',
    ],
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.NoErrorsPlugin(),
      // new BrowserSyncPlugin({
      //   proxy: 'localhost:8000',
      //   ghostMode: false,
      // }),
      // new NpmInstallPlugin(),
    ],
  };
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      //'webpack/hot/only-dev-server',
      // 'webpack-hot-middleware/client',
      './src/index.browser.js',
    ],
    plugins: [
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.NoErrorsPlugin(),
      // new BrowserSyncPlugin({
      //   proxy: 'localhost:8000',
      //   ghostMode: false,
      // }),
      // new NpmInstallPlugin(),
    ],
  // devtool: 'source-map',
  // entry: [
  //   './src/index.browser.js',
  // ],
  output: {
    filename: getJsBundle,
    path: Path.resolve(__dirname, '../../static/js'),
    publicPath: '/static/js/',
  },
	module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules|\.swp$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
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
  sassConfig: {
    precision: 8,
  },
  // plugins: [
  //   new Webpack.optimize.OccurenceOrderPlugin(),
  //   new Webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production'),
  //     },
  //   }),
  //   new Webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false,
  //     },
  //   }),
  // ],
};
