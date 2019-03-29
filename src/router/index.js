import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '@/pages/Login'
import Authorized from './Authorized'
import LayoutRouter from './LayoutRouter'

export default () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Authorized path="/" component={LayoutRouter} />
  </Switch>
)