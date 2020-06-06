import { Route, Switch } from 'react-router'

import Home from './components/Home'
import React from 'react'
import Room from './components/Room'
import routes from './routes'

function RoutesComponent(){
  return (
    <Switch>
      <Route path={routes.HOME} exact component={Home} />
      <Route path={routes.ROOM} component={Room} />
    </Switch>
  )
}

export default RoutesComponent