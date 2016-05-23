import { Actions } from '../lib/constants.js'
import { Map } from 'immutable'
import Debug from 'debug'

const log = Debug('jl:authReducer')

// auth is a JWT-based token property
const initialState = new Map({
  loginInProgress: false,
  token: 'im in',
})

export default function authReducer (state = initialState, action) {

  // TODO: use global error reducer to catch all failure actions
  if (action.error) {

    log('error:', action.error)

  }

  switch (action.type) {


    case Actions.LOGIN_REQUEST:
      log('LOGIN_REQUEST:')
      // Replace existing token with response
      return state.set('loginInProgress', true)

    case Actions.LOGIN_SUCCESS:
      log('LOGIN_SUCCESS:', action.token)
      // Replace existing token with response
      return state.merge({
        loginInProgress: false,
        token: action.token,
      })

    default:
      return state

  }

}
