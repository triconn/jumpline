var Dispatcher = require('../dispatcher/AppDispatcher.js');
var QueueConstants = require('../constants/QueueConstants.js');

module.exports = {

  receiveAddGuest: function(guest) {
    Dispatcher.handleServerAction({
      type: QueueConstants.ADD_GUEST_RESPONSE,
      guest: guest
    });
  },

  receiveGetGuests: function(guests) {
    Dispatcher.handleServerAction({
      type: QueueConstants.GET_GUESTS_RESPONSE,
      guests: guests
    });
  },

  receiveNotifyGuest: function(guest) {
    Dispatcher.handleServerAction({
      type: QueueConstants.NOTIFY_GUEST_RESPONSE,
      guest: guest
    });
  },

  receiveCompleteGuest: function(guest) {
    Dispatcher.handleServerAction({
      type: QueueConstants.COMPLETE_GUEST_RESPONSE,
      guest: guest
    });
  }


};
