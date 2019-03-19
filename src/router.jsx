import React from 'react'
import MenuAppbar from './components/header/menuAppbar'
import { HashRouter, Route, Switch } from 'react-router-dom'
import MainPage from './components/mainPage'

const Router = () => {
  return (
    <HashRouter>
      <div>
        <MenuAppbar/>
        <Switch>
          <Route exact path="/" component={ MainPage } />
        </Switch>
      </div>
    </HashRouter>
  )
}

export default Router
