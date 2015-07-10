var Dispatcher = require('../dispatcher/AppDispatcher.js');
var QueueConstants = require('../constants/QueueConstants.js');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _queue = {
  guests: []
};

var QueueStore = ObjectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getQueue: function() {
    return _queue;
  }
});

Dispatcher.register(function(payload) {

  switch(payload.action.type) {

    case QueueConstants.ADD_GUEST_RESPONSE:
      _queue.guests.push(payload.action.guest);
      console.log('Guest Added: ' + JSON.stringify(payload.action.guest));
      QueueStore.emit(CHANGE_EVENT);
      break;

    case QueueConstants.GET_GUESTS_RESPONSE:
      _queue.guests.push(payload.action.guests);
      QueueStore.emit(CHANGE_EVENT);
      break;

   default:
      console.log('No QueueStore handler found for the following type: ' + payload.action.type);
  }
});

module.exports = QueueStore;

