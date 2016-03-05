// verify appropriate env variables are present
const Joi = require('joi');

const Variables = {
  values: {
    IQUEUE_API_URL: process.env.IQUEUE_API_URL,
  },
  schemas: {
    IQUEUE_API_URL: Joi.required(),
  },
};

Joi.validate(Variables.values, Variables.schemas, (error, value) => {

  if (error) {
    console.error(error);
    exit;
  };

});


export function getServerConnection() {

  return {
    port: parseInt(process.env.PORT) || 8000,
    host: '0.0.0.0',
  };
}
