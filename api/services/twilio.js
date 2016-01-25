const Env = require('../config/env.js').getTwilio();
const Twilio = require('twilio')(Env.TWILIO_ACCOUNT_SID, Env.TWILIO_AUTH_TOKEN);

export function sendNotification(options, callback) {

  Twilio.messages.create({
    body: options.msg,
    to: '+1' + options.phone,
    from: '+1' + Env.TWILIO_NUMBER,
  },
  (err, message) => {

    if(err) return callback(err, null);

    callback(null, message);
  });
}


