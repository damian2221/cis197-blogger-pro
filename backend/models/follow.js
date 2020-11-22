const { Schema, model } = require('mongoose')

const followSchema = new Schema({
  follower: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
  followee: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true })

module.exports = model('Follow', followSchema)
