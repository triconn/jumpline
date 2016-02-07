import { Actions } from '../lib/constants.js';
import { fromJS, List, Map } from 'immutable';
import Debug from 'debug';

const log = Debug('iq:queueReducer');

// state is array of guests
const initialState = List();

export default function queueReducer(state = initialState, action) {

  switch (action.type) {


    case Actions.ADD_GUEST_SUCCESS:
      log('ADD_GUEST_SUCCESS:', action.guest);
      // Simply push the new guest to Immutable List
      return state.push(fromJS(action.guest));


    case Actions.GET_GUESTS_SUCCESS:
      log('GET_GUESTS_SUCCESS:', action.guests);
      // Replace existing queue with response guests
      return fromJS(action.guests);


    case Actions.NOTIFY_GUEST_SUCCESS:
      log('NOTIFY_GUEST_SUCCESS:', action.guest);
      // Find the List index of notified guest
      return state.update(
        state.findIndex(
          (guest) => {
            return guest.get('id') === action.guest.id;
        }),
        (guest) => {
          // Replace it entirely with response guest from iQueue API
          return fromJS(action.guest)
        }
      );


    case Actions.COMPLETE_GUEST_SUCCESS:
      log('COMPLETE_GUEST_SUCCESS:', action.guest);
      // Find the List index of completed guest
      return state.update(
        state.findIndex(
          (guest) => {
            return guest.get('id') === action.guest.id;
        }),
        (guest) => {
          // Replace it entirely with response guest from iQueue API
          return fromJS(action.guest)
        }
      );

  }

  if (action.error) {
    log('error:', action.error);
  }
  // Default
  return state;

}
