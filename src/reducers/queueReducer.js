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
      return state.push(fromJS(action.guest));
  }

  log('Hit default state');
  if (action.error) {
    log('error:', action.error);
  }
  // Default
  return state;

}
