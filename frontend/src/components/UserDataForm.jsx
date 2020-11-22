import React from 'react'

const UserDataForm = ({ formValues, onValueChange, hidePassword }) => (
  <div>
    Username (*):
    <input
      required
      className="form-control"
      defaultValue={formValues.username}
      onChange={e => onValueChange('username', e.target.value)}
    />
    { hidePassword ? <></>
      : (
        <>
          Password (*):
          <input
            required
            className="form-control"
            type="password"
            defaultValue={formValues.password}
            onChange={e => onValueChange('password', e.target.value)}
          />
        </>
      ) }
    First name (*):
    <input
      required
      className="form-control"
      defaultValue={formValues.first_name}
      onChange={e => onValueChange('first_name', e.target.value)}
    />
    Last name (*):
    <input
      required
      className="form-control"
      defaultValue={formValues.last_name}
      onChange={e => onValueChange('last_name', e.target.value)}
    />
    Gender (*):
    <select
      className="form-control"
      defaultValue={formValues.gender}
      onChange={e => onValueChange('gender', e.target.value)}
    >
      <option value="--">--</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
    Introduction:
    <textarea
      className="form-control"
      defaultValue={formValues.introduction}
      onChange={e => onValueChange('introduction', e.target.value)}
    />
  </div>
)

export default UserDataForm
