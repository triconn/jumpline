import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../containers/App.jsx';
import Login from '../containers/Login.jsx';
import Queue from '../containers/Queue.jsx';
import { requireAuth } from '../lib/auth.js';

const routes = (

  <Route path="/" component={App}>

    <IndexRoute component={Queue} onEnter={requireAuth}>
    </IndexRoute>

    <Route path="login" component={Login}>
    </Route>

    <Route path="oauth" component={Login}>
    </Route>

  </Route>

);

export default routes;
