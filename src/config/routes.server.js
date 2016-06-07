// All the routes
import Server from '../index.server.js'
import Request from 'superagent'
import Boom from 'boom'
import Promise from 'bluebird'
import Fs from 'fs'
import Path from 'path'

const FsPromise = Promise.promisifyAll(Fs)

const defaultRenderOptions = {
  runtimeOptions: {
    docType: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
  },
}

const htmlHandler = (request, reply) => {

  Promise.join(
    FsPromise.readFileAsync(
      Path.resolve(__dirname, '../../build/assets.json'),
      'utf-8'
    )
  )
  .then((assetsFile) => {

    const htmlProps = {
      title: 'Jumpline',
      assets: JSON.parse(assetsFile),
    }

    Server.log(['info'], htmlProps)

    return Server.render(
      'Html',
      htmlProps,
      defaultRenderOptions,
      (error, output) => {

        if (error) {

          Server.log(['error'], error)
          return reply(Boom.serverTimeout(error))

        }

        return reply(output)

      }
    )

  })
  .catch((error) => {

    Server.log(['error', 'htmlHandler'], error)
    return reply(Boom.serverTimeout(error))

  })

}

const postSlack = (from, body, url) => {

  return new Promise((resolve, reject) => {

    const text = `From: ${from}\n`
               + `Message: ${body}`

    Request.post(url)
    .send({ text })
    .end((error, response) => {

      if (error) reject(error)
      return resolve(response)

    })

  })

}

const smsReceiveHandler = (request, reply) => {

  Server.log(['info', 'sms'], {
    from: request.payload.From,
    message: request.payload.Body,
  })

  if (!process.env.SLACK_WEBHOOK) {

    return reply(Boom.serverTimeout('SLACK_WEBHOOK not set'))

  }

  return postSlack(
    request.payload.From,
    request.payload.Body,
    process.env.SLACK_WEBHOOK
  )
  .then((response) => {

    return reply(201)

  })
  .catch((error) => {

    return reply(Boom.serverTimeout(error))

  })

}

const routes = [
  {
    method: 'POST',
    path: '/sms/receive',
    handler: smsReceiveHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: htmlHandler,
  },
  {
    method: 'GET',
    path: '/sw.js',
    handler: {
      file: 'build/sw.js',
    },
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
