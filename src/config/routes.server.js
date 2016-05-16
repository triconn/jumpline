// All the routes
import Server from '../index.server.js'

const defaultRenderOptions = {
  runtimeOptions: {
    docType: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
  },
}

const htmlHandler = (request, reply) => {

  const htmlProps = {
    title: 'Jumpline',
  }

  Server.log(['info'], htmlProps)

  return Server.render(
    'Html',
    htmlProps,
    defaultRenderOptions,
    (error, output) => {

      if (error) {

        Server.log(['error'], error)
        reply(error).code(500)

      }

      return reply(output)

    }
  )

}

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: htmlHandler,
  },
  {
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: 'static',
      },
    },
  },
  {
    method: 'GET',
    path: `/${process.env.LOADERIO_TOKEN}/`,
    handler: (request, reply) => {

      return reply(process.env.LOADERIO_TOKEN)

    },
  },
  {
    method: 'GET',
    path: `/${process.env.LOADERIO_TOKEN}`,
    handler: (request, reply) => {

      return reply(process.env.LOADERIO_TOKEN)

    },
  },

  // Catch all react-router (client-side) routes
  {
    method: 'GET',
    path: '/{param*}',
    handler: htmlHandler,
  },
]

export default routes
