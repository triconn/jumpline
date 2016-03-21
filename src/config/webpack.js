require('babel-register');
// Webpack config file
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const Config = require('./webpack.production.js');
const Path = require('path');
const Webpack = require('webpack');

const getJsBundle = require('../lib/utils.js').getJsBundle();
//const NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index.browser.js',
  ],
  output: {
    filename: getJsBundle,
    path: Path.resolve(__dirname, '../../static/js'),
    publicPath: '/static/js/',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        'GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        'GOOGLE_CLIENT_SECRET': JSON.stringify(process.env.GOOGLE_CLIENT_SECRET),
        'GOOGLE_REDIRECT_URL': JSON.stringify(process.env.GOOGLE_REDIRECT_URL),
        'IQUEUE_API_URL': JSON.stringify(process.env.IQUEUE_API_URL),
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new BrowserSyncPlugin({
      proxy: 'localhost:8000',
      ghostMode: false,
    }),
    // new NpmInstallPlugin(),
  ],
	module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
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
	resolve: {
    root: [
      Path.resolve('../../src'),
    ],
  },
  sassConfig: {
    precision: 8,
  },
};
