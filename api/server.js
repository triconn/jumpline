// Create a basic Hapi.js server
require('babel-register')({});
const Hapi = require('hapi');
const Env = require('./config/env.js');
const Plugins = require('./config/plugins.js');
const Routes = require('./config/routes.js');

// Basic Hapi.js connection stuff
var server = new Hapi.Server();
server.connection({
  host: Env.getServer().host,
  port: Env.getServer().port
});

// Register plugins
server.register(Plugins, function(err) {

  // Add the React-rendering view engine
  server.views({
    engines: {
        jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'views'
  });

  // Add a routes
  server.route(Routes);

  // Start the server
  server.start(function() {

    server.log(['info'], 'Server started at: ' + server.info.uri);
    server.log(['info'], `API docs available at: ${server.info.uri}/documentation`);

  });
});

