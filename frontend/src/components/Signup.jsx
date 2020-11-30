import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import UserDataForm from './UserDataForm'

const Wrapper = styled.div`
  padding: 15px;
  width: 500px;
  margin: auto;
`

const Signup = ({ UNKNOWN_AUTH_STATUS, setAuthStatus }) => {
  const formValues = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: '--',
    introduction: '',
  }

  const signup = async e => {
    e.preventDefault()
    axios.post('/api/user/signup', formValues).then(() => {
      setAuthStatus(UNKNOWN_AUTH_STATUS)
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      <form onSubmit={e => signup(e)}>
        <UserDataForm
          formValues={formValues}
          onValueChange={(valueName, value) => {
            formValues[valueName] = value
          }}
        />
        <input
          type="submit"
          className="btn btn-info btn-block"
          style={{ margin: '15px 0' }}
        />
      </form>
      Already have an account?&nbsp;
      <Link to="/login">Log in here!</Link>
    </Wrapper>
  )
}

export default Signup
