import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'

import UserProfile from './UserProfile'
import Login from './Login'
import Signup from './Signup'
import Header from './Header'
import Search from './Search'
import EditProfile from './EditProfile'
import Home from './Home'
import Article from './Article'

const UNKNOWN_AUTH_STATUS = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

const Wrapper = styled.div`
  margin: 15px auto;
  width: 70%;
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 15px;
`

const App = () => {
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState(UNKNOWN_AUTH_STATUS)

  useEffect(() => {
    if (authStatus === UNKNOWN_AUTH_STATUS) {
      axios.get('/api/user').then(res => {
        if (res.data) {
          setUser(res.data)
          setAuthStatus(AUTHORIZED)
        } else {
          setAuthStatus(UNAUTHORIZED)
        }
      }).catch(() => {
        setAuthStatus(UNAUTHORIZED)
      })
    }
  }, [authStatus])

  if (authStatus === UNKNOWN_AUTH_STATUS) {
    return (<></>)
  } if (authStatus === UNAUTHORIZED) {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login UNKNOWN_AUTH_STATUS={UNKNOWN_AUTH_STATUS} setAuthStatus={setAuthStatus} />
          </Route>
          <Route exact path="/signup">
            <Signup UNKNOWN_AUTH_STATUS={UNKNOWN_AUTH_STATUS} setAuthStatus={setAuthStatus} />
          </Route>
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    )
  }

  return (
    <Router>
      <Header user={user} UNKNOWN_AUTH_STATUS={UNKNOWN_AUTH_STATUS} setAuthStatus={setAuthStatus} />
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Home user={user} />
          </Route>
          <Route path="/profile/:username">
            <UserProfile user={user} />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/edit-profile">
            <EditProfile user={user} setUser={setUser} />
          </Route>
          <Route path="/article/:articleId">
            <Article />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  )
}

export default App
