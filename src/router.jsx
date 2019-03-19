import React from 'react'
import MenuAppbar from './components/header/menuAppbar'
import { HashRouter, Route, Switch } from 'react-router-dom'
import MainPage from './components/mainPage'
import SignupPage from './components/signupPage'
import LoginPage from './components/loginPage'
import Profile from './components/menu_item/profile'

const Router = () => {
  return (
    <HashRouter>
      <div>
        <MenuAppbar/>
        <Switch>
          <Route exact path="/" component={ MainPage } />
          <Route exact path="/signup" component={ SignupPage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route exact path="/menu/profile" component={ Profile } />
        </Switch>
      </div>
    </HashRouter>
  )
}

export default Router
