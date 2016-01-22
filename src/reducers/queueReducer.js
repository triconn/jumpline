import { Actions } from '../utils/constants.js';
import { List,Map } from 'immutable';

const initialState = Map({
  guests: List(),
});

export default function queueReducer(state = initialState, action) {

  switch (action.type) {

    case Action.ADD_GUEST:

  }

  // Default
  return state;

}

