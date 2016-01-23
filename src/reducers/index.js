// Combine all reducers for the store
import { combineReducers } from 'redux';

// iQueue reducers
import queue from './queueReducer.js';

// The root reducer which combines all others
export default const rootReducer = combineReducers({
  queue,
});

