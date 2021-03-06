import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from '../containers/App.jsx'
import Login from '../containers/Login.jsx'
import Queue from '../containers/Queue.jsx'
import { requireAuthentication } from '../containers/AuthenticatedComponent.jsx'

const routes = (

  <Route path='/' component={App}>

    <IndexRoute component={requireAuthentication(Queue)} />

    <Route path='login' component={Login} />

    <Route path='oauth' component={Login} />

  </Route>

)

export default routes
