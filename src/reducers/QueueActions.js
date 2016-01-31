import { Actions } from '../lib/constants.js';

export function addGuest(guest) {
  return {
    type: Actions.ADD_GUEST,
    guest,
  };
}

export function getCurrentGuests(guest) {
  return {
    type: Actions.GET_GUESTS,
    guest,
  };
}

export function notifyGuest(id) {
  return {
    type: Actions.NOTIFY_GUEST,
    guest,
  };
}

export function completeGuest(id) {
  return {
    type: Actions.COMPLETE_GUEST,
    guest,
  };
}
