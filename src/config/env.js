// verify appropriate env variables are present
import Joi from 'joi'

const Variables = {
  values: {
    IQUEUE_API_URL: process.env.IQUEUE_API_URL,
  },
  schemas: {
    IQUEUE_API_URL: Joi.required(),
  },
}

Joi.validate(Variables.values, Variables.schemas, (error, value) => {

  if (error) {

    console.error(error)
    process.exit()

  }

})


export function getServerConnection () {

  return {
    port: parseInt(process.env.PORT, 10) || 8000,
    host: '0.0.0.0',
    routes: {
      cors: true,
    },
  }

}
