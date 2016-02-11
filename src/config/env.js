// verify appropriate env variables are present
const Joi = require('joi');

const Variables = {
  values: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  },
  schemas: {
    TWILIO_ACCOUNT_SID: Joi.required(),
    TWILIO_AUTH_TOKEN: Joi.required(),
    TWILIO_NUMBER: Joi.number().required().min(1111111111).max(9999999999).precision(0),
  },
};

Joi.validate(Variables.values, Variables.schemas, (err, value) => {

  if(err) {
    console.error(err);
    console.error('Some functionality may not be available');
  };

});


export function getServerConnection() {

  return {
    port: parseInt(process.env.PORT) || 8000,
    host: '0.0.0.0',
  };
}

export function getDb() {

  return {
    connection: 'disk',
    migrate: 'drop',
  };
}

export function getTwilio() {

  return {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  };
}
