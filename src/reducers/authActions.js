import Debug from 'debug';
import { Actions } from '../lib/constants.js';
import iQueue from '../helpers/iqueue.js';

const log = Debug('iq:authActions');

export function loginRequest() {
  return {
    type: Actions.LOGIN_REQUEST,
  };
}

export function loginSuccess(token) {
  return {
    type: Actions.LOGIN_SUCCESS,
    token,
  };
}

export function loginFailure(error) {
  return {
    type: Actions.LOGIN_FAILURE,
    error,
  };
}

export function login(loginQuery) {

  return (dispatch) => {

    dispatch(loginRequest());

    return new iQueue().query(loginQuery)
    .then((body) => {

      dispatch(loginSuccess(body.data.token));

    })
    .catch((error) => {

      dispatch(loginFailure(error));

    });
  }
}

