/**
 * GuestController
 *
 * @description :: Server-side logic for managing guests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  notify: function (req, res) {

    Guest.findOne({ id: req.param('id') }).exec(function (err, guest) {

      if (err) return res.status(500).json(err);
      if (!guest) return res.status(404);

      var Twilio = require('../services/twilio.js');
      var opt = {
        recipient: guest.phone,
        msg: guest.name + ', your table is ready!'
      };

      Twilio.send(opt, function (err, result) {
        if (err) {
          return res.status(500).json({
            error: err
          });
        };

        return res.json(result);
      });

    });
  }
};

