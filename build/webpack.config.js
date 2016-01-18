// Webpack config file
var Path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var Cache = require('../utils/cache.js');
var jsBundle = 'bundle-' + Cache.bust() + '.js';

module.exports = {
  entry: './web/react/app.js',
  output: {
    path: Path.resolve(__dirname, '../web/static/js'),
    filename: jsBundle,
  },
	module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      // Configure loading font files, svg, etc
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  sassConfig: {
    precision: 8,
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8000',
      ghostMode: false,
    }),
  ],
};

