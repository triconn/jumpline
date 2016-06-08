import Boom from 'boom'
import Promise from 'bluebird'
import Request from 'superagent'
import Server from '../index.server.js'


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

export const smsReceiveHandler = (request, reply) => {

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
