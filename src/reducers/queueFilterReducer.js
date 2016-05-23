import {
  Actions,
  DefaultSettings,
} from '../lib/constants.js'
import { Map } from 'immutable'
import Debug from 'debug'

const log = Debug('jl:queueFilterReducer')

// state is array of guests
const initialState = new Map({
  queueFilter: DefaultSettings.DEFAULT_QUEUE_FILTER,
})

export default function queueFilterReducer (state = initialState, action) {

  // TODO: use global error reducer to catch all failure actions
  if (action.error) {

    log('error:', action.error)

  }

  switch (action.type) {


    case Actions.SET_QUEUE_FILTER:
      log('SET_QUEUE_FILTER:', action.queueFilter)
      return state.set('queueFilter', action.queueFilter)

    default:
      return state
  }

}
