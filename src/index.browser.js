import Debug from 'debug'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './config/routes.browser.js'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './lib/configureStore.js'

// Global styles
import './index.css'

if (module.hot) {

  module.hot.accept()

}

// Needed for onTouchTap
// https://stackoverflow.com/a/34015469/988941
InjectTapEventPlugin()

const log = {
  jl: Debug('jl'),
  store: Debug('jl:store'),
}

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

// Show debug example
log.jl(`Debug logging available on the following channels:
       jl
       jl:store`)
log.jl(`Debug channels enabled: '${localStorage.debug}'`)

ReactDOM.render(

  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,

  document.getElementById('App')
)
