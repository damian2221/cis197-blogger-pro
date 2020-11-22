const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, enum: ['--', 'Male', 'Female', 'Other'], required: true },
  introduction: { type: String },
})

module.exports = model('User', userSchema)
