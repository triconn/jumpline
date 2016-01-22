import { Actions } from '../utils/constants.js';

export function addGuest(guest) {
  return {
    type: Actions.ADD_GUEST,
    guest,
  };
}

