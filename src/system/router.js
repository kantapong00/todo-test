import React from "react";
import { Route, BrowserRouter } from 'react-router-dom'
import Login from '../page/login'
import Main from '../page/main'

export default function Router() {
  return (
    <BrowserRouter>
      <Route exact path={'/'} component={Login} />
      <Route exact path={'/main'} component={Main} />
    </BrowserRouter>
  )
}
