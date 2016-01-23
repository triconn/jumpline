import { Actions } from '../lib/constants.js';

export function addGuest(guest) {
  return {
    type: Actions.ADD_GUEST,
    guest,
  };
}

