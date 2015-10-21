import * as iQueueApi from '../utils/iQueueApi.js';
import Dispatcher from '../dispatcher/AppDispatcher.js';
import { Actions } from '../utils/Constants.js';

export function addGuest(guest) {
  Dispatcher.handleViewAction({
    type: Actions.ADD_GUEST,
    guest: guest,
  });

  iQueueApi.addGuest(guest);
}

export function getGuests() {
  Dispatcher.handleViewAction({
    type: Actions.GET_GUESTS,
  });

  iQueueApi.getAllGuests();
}

export function notifyGuest(id) {
  Dispatcher.handleViewAction({
    type: Actions.NOTIFY_GUEST,
  });

  iQueueApi.notifyGuest(id);
}

export function completeGuest(id) {
  Dispatcher.handleViewAction({
    type: Actions.COMPLETE_GUEST,
  });

  iQueueApi.completeGuest(id);
}

