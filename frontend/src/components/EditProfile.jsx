import React from 'react'
import axios from 'axios'

import UserDataForm from './UserDataForm'

const formValues = {}

const EditProfile = ({ user, setUser }) => {
  Object.assign(formValues, user)

  const edit = async e => {
    e.preventDefault()
    const newUser = {}
    Object.assign(newUser, formValues)
    delete newUser.password
    delete newUser.currentPassword
    axios.put('/api/user/edit', formValues).then(() => {
      setUser(newUser)
      toastr.success('Successfully edited the user!')
    }).catch(err => {
      if (err && err.response) {
        toastr.error(err.response.data)
      }
    })
  }

  return (
    <div>
      <h3>Edit Profile</h3>
      <form onSubmit={e => edit(e)}>
        <UserDataForm
          formValues={formValues}
          onValueChange={(valueName, value) => {
            formValues[valueName] = value
          }}
          isEdit
        />
        <input
          type="submit"
          className="btn btn-info btn-block"
          style={{ margin: '15px 0' }}
        />
      </form>
    </div>
  )
}

export default EditProfile
