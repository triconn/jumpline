var Env = require('../config/env.js').getTwilio();
var Twilio = require('twilio')(Env.TWILIO_ACCOUNT_SID, Env.TWILIO_AUTH_TOKEN);

module.exports = {

  sendNotification: function(options, cb) {

    Twilio.messages.create({
      body: options.msg,
      to: '+1' + options.phone,
      from: '+1' + Env.TWILIO_NUMBER
    }, function(err, message) {
      if(err) return cb(err, null);
      cb(null, message);
    });
  }

};

