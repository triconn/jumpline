// Combine all reducers for the store
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// iQueue reducers
import auth from './authReducer.js'
import queue from './queueReducer.js'
import queueFilter from './queueFilterReducer.js'

// The root reducer which combines all others
const rootReducer = combineReducers({
  auth,
  queue,
  queueFilter,
  routing: routerReducer,
})

export default rootReducer
