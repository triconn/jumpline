// Webpack config file
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var Cache = require('./config/cache.js');
var jsBundle = 'bundle-' + Cache.bust() + '.js';

module.exports = {
  entry: './assets/js/app.js',
  output: {
    path: __dirname + '/assets/js',
    filename: jsBundle
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'jsx-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8000'
    })
  ]
};

