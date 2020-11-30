const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
  author: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Number, required: true },
})

module.exports = model('Article', articleSchema)
