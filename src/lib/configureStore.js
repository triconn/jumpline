import Debug from 'debug'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import Thunk from 'redux-thunk'
import rootReducer from '../reducers/index.js'

const log = Debug('jl')

export default function configureStore (initialState) {

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      routerMiddleware(browserHistory),
      Thunk
    ),
    typeof window === 'object'
      && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : (f) => f
  ))

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {

    log('Module is hot!')
    module.hot.accept('../reducers', () => {

      const nextRootReducer = rootReducer
      store.replaceReducer(nextRootReducer)

    })

  }

  return store

}
