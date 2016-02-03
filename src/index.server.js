// Create a basic Hapi.js server
require('babel-register');
require('babel-polyfill');
const Hapi = require('hapi');
const HapiReactViews = require('hapi-react-views');
const Path = require('path');
const Plugins = require('./config/plugins.js').default;
const Routes = require('./config/routes.js').routes;
const getServerConnection = require('./config/env.js').getServerConnection;

// Basic Hapi.js connection stuff
const server = new Hapi.Server();
server.connection(getServerConnection());

// Register plugins
server.register(Plugins, (err) => {

  // Add the React-rendering view engine
  server.views({
    engines: {
        jsx: HapiReactViews,
    },
    relativeTo: __dirname,
    path: 'components',
  });

  // Add a routes
  server.route(Routes);

  // Start the server
  server.start(() => {

    server.log(['info'], `NODE_ENV: ${process.env.NODE_ENV}`);
    server.log(['info'], `Server started at: ${server.info.uri}`);
    server.log(['info'], `API docs available at: ${server.info.uri}/docs`);
  });
});
