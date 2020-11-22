import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

const UserFullName = styled.h3`
  display: inline-block;
  margin-right: 25px;
`

const FollowButton = styled.button`
  float: right;
`

const UserDetails = styled.div`
  margin-top: 5px;
`

const Introduction = styled.i`
  padding-left: 5px;
`

const UserProfile = ({ user }) => {
  const { username } = useParams()
  const history = useHistory()
  const [targetUser, setTargetUser] = useState(null)
  const [isFollowButtonLocked, setIsFollowButtonLocked] = useState(false)

  useEffect(() => {
    axios.get(`/api/user/${username}`).then(res => {
      if (res.data.username) {
        setTargetUser(res.data)
      } else {
        history.push('/')
      }
    }).catch(err => {
      if (err && err.response) {
        alert(err.response.data)
      }
    })
  }, [])

  if (!targetUser) {
    return (<></>)
  }

  if (!isFollowButtonLocked && user._id === targetUser._id) {
    setIsFollowButtonLocked(true)
  }

  const follow = () => {
    setIsFollowButtonLocked(true)
    axios.post(`/api/user/${targetUser.is_followed ? 'un' : ''}follow`, {
      follower: user._id,
      followee: targetUser._id,
    }).then(() => {
      targetUser.is_followed = !targetUser.is_followed
      setTargetUser(targetUser)
      setIsFollowButtonLocked(false)
    }).catch(err => {
      setIsFollowButtonLocked(false)
      if (err && err.response) {
        alert(err.response.data)
      }
    })
  }

  return (
    <div>
      <UserFullName>
        { targetUser.first_name }
        {' '}
        { targetUser.last_name }
      </UserFullName>
      <FollowButton
        disabled={isFollowButtonLocked}
        type="button"
        className={`btn btn-${targetUser.is_followed ? 'outline-' : ''}info`}
        onClick={() => follow()}
      >
        { targetUser.is_followed ? 'Unfollow' : 'Follow' }
      </FollowButton>
      <UserDetails>
        Gender:
        {' '}
        <b>{ targetUser.gender }</b>
        <br />
        Introduction:
        <br />
        <Introduction>
          { targetUser.introduction ? targetUser.introduction
            : 'This user does not have an introduction yet!' }
        </Introduction>
      </UserDetails>
    </div>
  )
}

export default UserProfile
