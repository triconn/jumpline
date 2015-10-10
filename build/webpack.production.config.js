// Webpack config file
var Path = require('path');
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
      }
    ]
  }
};

