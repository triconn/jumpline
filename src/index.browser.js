import Debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  IndexRoute,
  Router,
  Route,
  browserHistory
} from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import { isLoggedIn, requireAuth } from './lib/auth.js';
import configureStore from './lib/configureStore.js';

import App from './containers/App.jsx';
import Login from './containers/Login.jsx';
import Queue from './containers/Queue.jsx';
import './index.css';

if (module.hot) {
  module.hot.accept();
}

const log = {
  iq: Debug('iq'),
  store: Debug('iq:store'),
};

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

// Show debug example
log.iq(`Debug logging available on the following channels:
       iq
       iq:store`);
log.iq(`Debug channels enabled: '${localStorage.debug}'`);

ReactDOM.render(
  <Provider
    store={store}
    >

    <Router
      history={history}
      >

      <Route
        path="/"
        component={App}
        >

        <IndexRoute
          component={Queue}
          onEnter={requireAuth}
          >
        </IndexRoute>

        <Route
          path="login"
          component={Login}
          >
        </Route>

      </Route>

    </Router>

  </Provider>,

  document.getElementById('App')
);
