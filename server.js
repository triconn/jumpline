// Create a basic Hapi.js server
var Hapi = require('hapi');
var requireDir = require('require-directory');
var Config = requireDir(module, './config');
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";

// Basic Hapi.js connection stuff
var server = new Hapi.Server();
server.connection({
  host: Config.env.getServer().host,
  port: Config.env.getServer().port
});

// Add the React-rendering view engine
server.views({
  engines: {
      jsx: require('hapi-react-views')
  },
  relativeTo: __dirname,
  path: 'api/views'
});

// Add a route to serve static assets (CSS, JS, IMG)
server.route(Config.routes);

// Register plugins
server.register(Config.plugins, function(err) {

  // Start the server
  server.start(function() {

    console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);
  });
});

