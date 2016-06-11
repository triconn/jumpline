import Boom from 'boom'
import Google from 'googleapis'

const OAuth2 = Google.auth.OAuth2
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

export const googleRedirectHandler = (request, reply) => {


  const scope = [
    `${escape('email')}`,
  ]

  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    approval_prompt: 'auto',
    scope, // If you only need one scope you can pass it as string
  })

  return reply.redirect(url)

}


export const googleCallbackHandler = (request, reply) => {

  const code = request.query.code

  oauth2Client.getToken(code, (err, tokens) => {

    if (err) {

      return reply(Boom.serverTimeout(err))

    }

    return reply(tokens).spaces(2)

  })

}
