import { Actions } from '../utils/AppConstants.js';

export function addGuest(guest) {
  return {
    type: Actions.ADD_GUEST,
    guest,
  };
}

