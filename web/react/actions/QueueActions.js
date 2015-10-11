import { add, get, notify, complete } from '../utils/GuestAPI.js';
import Dispatcher from '../dispatcher/AppDispatcher.js';
import { QueueConstants } from '../constants/QueueConstants.js';

export function addGuest(guest) {
  Dispatcher.handleViewAction({
    type: QueueConstants.ADD_GUEST,
    guest: guest,
  });

  add(guest);
}

export function getGuests() {
  Dispatcher.handleViewAction({
    type: QueueConstants.GET_GUESTS,
  });

  get();
}

export function notifyGuest(id) {
  Dispatcher.handleViewAction({
    type: QueueConstants.NOTIFY_GUEST,
  });

  notify(id);
}

export function completeGuest(id) {
  Dispatcher.handleViewAction({
    type: QueueConstants.COMPLETE_GUEST,
  });

  complete(id);
}

