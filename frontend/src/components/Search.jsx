import React, { useState, useEffect } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const UserItem = styled.div`
  border: 1px solid #d8d8d8;
  padding: 0px 10px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  margin: 8px 0;
  cursor: pointer;
  color: #555555;
`

const Search = () => {
  const history = useHistory()
  const fullName = new URLSearchParams(useLocation().search).get('fullName')
  const [searchResults, setSearchResults] = useState([])
  const [responseReceived, setResponseReceived] = useState(false)

  useEffect(() => {
    axios.get(`/api/user/search?fullName=${encodeURIComponent(fullName)}`).then(res => {
      if (res.data && res.data.length === 1) {
        history.push(`/profile/${res.data[0]}`)
        return
      }
      setSearchResults(res.data)
      setResponseReceived(true)
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }, [fullName])

  if (!responseReceived) {
    return (<></>)
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>
        Search results for&nbsp;
        { fullName }
        :
      </h3>
      { searchResults && searchResults.length > 0
        ? searchResults.map(username => (
          <Link
            style={{
              display: 'block', margin: '0 auto', width: '300px', textDecoration: 'none',
            }}
            key={username}
            to={`/profile/${username}`}
          >
            <UserItem>
              {username}
            </UserItem>
          </Link>
        ))
        : (<i>No user with that name!</i>)}
    </div>
  )
}

export default Search
