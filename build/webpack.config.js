// Webpack config file
var Path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var Cache = require('../utils/cache.js');
var jsBundle = 'bundle-' + Cache.bust() + '.js';

module.exports = {
  entry: './web/react/app.js',
  output: {
    path: Path.resolve(__dirname, '../web/static/js'),
    filename: jsBundle
  },
  module: {
    preLoaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'eslint-loader',
        include: Path.resolve(__dirname, '../web'),
        exclude: /bundle.*\.js$/
      }
    ],
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8000'
    })
  ]
};

