import { Actions } from '../utils/constants.js';
import { fromJS, List, Map } from 'immutable';

// state is array of guests
const initialState = List();

export default function queueReducer(state = initialState, action) {

  switch (action.type) {

    case Action.ADD_GUEST:
      return state.push(fromJS(action.guest));
  }

  // Default
  return state;

}

