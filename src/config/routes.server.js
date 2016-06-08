// All the routes
import { htmlHandler } from '../handlers/html.js'
import { smsReceiveHandler } from '../handlers/slack.js'
import {
  googleRedirectHandler,
  googleCallbackHandler,
} from '../handlers/google.js'

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
        path: 'build',
        lookupCompressed: true,
      },
    },
  },

  // Google auth
  {
    method: 'GET',
    path: '/auth/google/redirect',
    handler: googleRedirectHandler,
  },
  {
    method: 'GET',
    path: '/auth/google/callback',
    handler: googleCallbackHandler,
  },

  // SMS notifications
  {
    method: 'POST',
    path: '/sms/receive',
    handler: smsReceiveHandler,
  },

  // Service workers and app cache
  {
    method: 'GET',
    path: '/sw.js',
    handler: {
      file: 'build/sw.js',
    },
  },
  {
    method: 'GET',
    path: '/appcache/{param*}',
    handler: {
      directory: {
        path: 'appcache',
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
