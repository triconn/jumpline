import { Actions } from '../lib/constants.js';
import { fromJS, Map } from 'immutable';
import Debug from 'debug';

const log = Debug('iq:authReducer');

// auth is a JWT-based token property
const initialState = new Map({
  loginInProgress: false,
  token: '',
});

export default function authReducer(state = initialState, action) {

  switch (action.type) {


    case Actions.LOGIN_SUCCESS:
      log('LOGIN_SUCCESS:', action.token);
      // Replace existing token with response
      return state.set('token', action.token);

  }

  // TODO: use global error reducer to catch all failure actions
  if (action.error) {
    log('error:', action.error);
  }
  // Default
  return state;

}

