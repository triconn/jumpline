require('babel-register');
// Webpack config file
const Path = require('path');
const Webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const jsBundle = require('../src/lib/utils.js').getJsBundle();

// Setup default vars
var entry = [
  './src/index.browser.js',
];
var plugins = [
];

console.log('NODE_ENV:', process.env.NODE_ENV);

// Add development plugins
if (process.env.NODE_ENV === 'development') {

  // entry.unshift(
  //   'webpack-dev-server/client?http://0.0.0.0:3000',
  //   'Webpack/hot/only-dev-server'
  // );
  plugins.unshift(
    // new Webpack.HotModuleReplacementPlugin()
    new BrowserSyncPlugin({
      proxy: 'localhost:8000',
      ghostMode: false,
    })
  );
}

// Add production/test plugins
else {

  plugins.unshift(
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  );
}

module.exports = {
  entry: entry,
  output: {
    filename: jsBundle,
    path: Path.resolve(__dirname, '../static/js'),
    publicPath: '/static/',
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
  plugins: plugins,
};

