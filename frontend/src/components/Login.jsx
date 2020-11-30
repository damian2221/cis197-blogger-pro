import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 15px;
  width: 300px;
  margin: auto;
`

const Login = ({ UNKNOWN_AUTH_STATUS, setAuthStatus }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    axios.post('/api/user/login', { username, password }).then(() => {
      setAuthStatus(UNKNOWN_AUTH_STATUS)
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }

  return (
    <Wrapper>
      <h2>Log In</h2>
      Username:
      <input className="form-control" onChange={e => setUsername(e.target.value)} />
      Password:
      <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} />
      <button
        type="button"
        className="btn btn-info btn-block"
        style={{ margin: '15px 0' }}
        onClick={() => login()}
      >
        Log In
      </button>
      Don&apos;t have an account?&nbsp;
      <Link to="/signup">Sign up!</Link>
    </Wrapper>
  )
}

export default Login
