import Boom from 'boom'
import Fs from 'fs'
import Path from 'path'
import Promise from 'bluebird'
import Server from '../index.server.js'

const FsPromise = Promise.promisifyAll(Fs)

const defaultRenderOptions = {
  runtimeOptions: {
    docType: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
  },
}

export const htmlHandler = (request, reply) => {

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
