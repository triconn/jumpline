const Fs = require('fs');
const Good = require('good');
const GoodConsole = require('good-console');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');

const plugins = [
  {
    register: Inert,
  },
  {
    register: Vision,
  },
  {
    register: Good,
    options: {
      opsInterval: 5000,
      reporters: [
        {
          reporter: GoodConsole,
          events: { log: '*', request: '*', response: '*', error: '*' },
        },
      ],
    },
  },
];


// Register development plugins
if (process.env.NODE_ENV === 'development') {

  const HapiSwagger = require('hapi-swagger');
  const Webpack = require('webpack');
  const WebpackConfig = require('./webpack.js');
  const WebpackPlugin = require('hapi-webpack-plugin');

  plugins.push({
    register: HapiSwagger,
    options: {
      documentationPath: '/docs',
    },
  },
  {
    register: WebpackPlugin,
    options: {
      assets: {
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
      },
      compiler: new Webpack(WebpackConfig),
      hot: {},
    },
  });
}

export default plugins;
