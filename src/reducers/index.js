// Combine all reducers for the store
import { combineReducers } from 'redux';

// iQueue reducers
import queue from './queueReducer.js';
import queueFilter from './queueFilterReducer.js';

// The root reducer which combines all others
const rootReducer = combineReducers({
  queue,
  queueFilter,
});

export default rootReducer;
