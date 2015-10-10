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
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$|\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8000'
    })
  ]
};

