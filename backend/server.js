const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')

const UserRouter = require('./routes/user')
const ArticleRouter = require('./routes/article')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogger-pro'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use('/api/user', UserRouter)
app.use('/api/article', ArticleRouter)

app.use((err, req, res, next) => {
  res.status(500)
  if (typeof err === 'string') {
    res.send(err)
  } else if (err && err.message) {
    console.error(err.stack)
    res.send(err.message)
  } else {
    res.send(err)
  }
})

app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
