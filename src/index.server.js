// Create a basic Hapi.js server
import Hapi from 'hapi'
import HapiReactViews from 'hapi-react-views'
import Plugins from './config/plugins.js'
import Routes from './config/routes.server.js'
import { getServerConnection } from './config/env.js'

// Basic Hapi.js connection stuff
const server = new Hapi.Server()
server.connection(getServerConnection())

// Register plugins
server.register(Plugins, (err) => {

  if (err) return server.log(['error'], err)

  // Add the React-rendering view engine
  server.views({
    engines: {
      jsx: HapiReactViews,
    },
    relativeTo: __dirname,
    path: 'components',
  })

  // Add a routes
  server.route(Routes)

  // Start the server
  return server.start(() => {

    server.log(['info'], `NODE_ENV: ${process.env.NODE_ENV}`)
    server.log(['info'], `Server started at: ${server.info.uri}`)

    // Only log hapi-swagger if in development
    if (process.env.NODE_ENV === 'development') {

      server.log(['info'], `API docs available at: ${server.info.uri}/docs`)

    }

  })

})

export default server
