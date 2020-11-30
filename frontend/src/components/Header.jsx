import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #dadada;
  padding-top: 2px;
`

const HeaderContent = styled.div`
  width: 70%;
  margin: auto;
`

const Logo = styled.h5`
  display: inline-block;
  padding: 5px 0;
  color: #1c7de0;
`

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  display: inline-block;
  margin: 0 15px;
`

const RightSide = styled.div`
  float: right;
  margin: 4px 0;
`

const UserFullName = styled.span`
  color: #555555;
`

const RightSideButton = styled.button`
  margin-left: 14px;
`

const ENTER_KEY_CODE = 13

const Header = ({ user, UNKNOWN_AUTH_STATUS, setAuthStatus }) => {
  const history = useHistory()
  const [search, setSearch] = useState('')

  const logOut = () => {
    axios.post('/api/user/logout').then(() => {
      setAuthStatus(UNKNOWN_AUTH_STATUS)
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }

  const goSearch = e => {
    if (e.keyCode === ENTER_KEY_CODE) {
      history.push(`/search?fullName=${encodeURIComponent(search)}`)
    }
  }

  return (
    <Wrapper>
      <HeaderContent>
        <Link to="/">
          <Logo>
            blogger
            <b>pro</b>
          </Logo>
        </Link>
        <SearchInput
          className="form-control"
          placeholder="Find user by full name..."
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => goSearch(e)}
        />
        <RightSide>
          <Link style={{ textDecoration: 'none' }} to={`/profile/${user.username}`}>
            <UserFullName>
              {user.first_name}
              {' '}
              {user.last_name}
            </UserFullName>
          </Link>
          <Link to="/edit-profile">
            <RightSideButton
              type="button"
              className="btn btn-info"
              style={{ height: '30px', paddingTop: '1px' }}
            >
              Edit profile
            </RightSideButton>
          </Link>
          <RightSideButton
            type="button"
            className="btn btn-info"
            onClick={() => logOut()}
            style={{ height: '30px', paddingTop: '1px' }}
          >
            Log out
          </RightSideButton>
        </RightSide>
      </HeaderContent>
    </Wrapper>
  )
}

export default Header
