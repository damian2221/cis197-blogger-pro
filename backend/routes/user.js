const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')
const Follow = require('../models/follow')

const router = express.Router()

router.get('/search', async (req, res, next) => {
  const { fullName } = req.query
  if (!fullName) {
    res.send(null)
  } else {
    const [first_name, last_name] = fullName.split(' ')

    try {
      const users = await User.find({ first_name, last_name })
      res.send(users.map(user => user.username))
    } catch (err) {
      next(err)
    }
  }
})

router.get('/', isAuthenticated, async (req, res, next) => {
  User.findOne({ username: req.session.username }, (err, user) => {
    if (err) {
      next(err)
    } else {
      const {
        _id, username, first_name, last_name, gender, introduction,
      } = user
      res.send({
        _id, username, first_name, last_name, gender, introduction,
      })
    }
  })
})

router.get('/:username', isAuthenticated, async (req, res, next) => {
  const { username } = req.params

  try {
    const targetUser = await User.findOne({ username })
    if (!targetUser) {
      return res.send(null)
    }
    const user = await User.findOne({ username: req.session.username })
    if (!user) {
      return res.send(null)
    }
    const follow = await Follow.findOne({ follower: user._id, followee: targetUser._id })
    const {
      _id, first_name, last_name, gender, introduction,
    } = targetUser
    return res.send({
      _id, username, first_name, last_name, gender, introduction, is_followed: !!follow,
    })
  } catch (err) {
    return next(err)
  }
})

router.put('/edit', isAuthenticated, async (req, res, next) => {
  const {
    password, currentPassword, first_name, last_name, introduction, gender,
  } = req.body

  User.findOne({ username: req.session.username, password: currentPassword }, (err1, user) => {
    if (err1) {
      next(err1)
    } else if (!user) {
      next('Invalid password!')
    } else {
      const toUpdate = {
        first_name, last_name, introduction, gender,
      }
      if (password) {
        toUpdate.password = password
      }
      User.findOneAndUpdate({ _id: user._id }, toUpdate, err2 => {
        if (err2) {
          next(err2)
        } else {
          res.send('User edited successfully!')
        }
      })
    }
  })
})

router.post('/follow', async (req, res, next) => {
  const { follower, followee } = req.body

  if (follower === followee) {
    next('Cannot change follow yourself!')
  }
  try {
    await Follow.create({ follower, followee })
    res.send('Followed')
  } catch (err) {
    next(err)
  }
})

router.post('/unfollow', async (req, res, next) => {
  const { follower, followee } = req.body

  if (follower === followee) {
    next('Cannot change unfollow yourself!')
  }
  try {
    await Follow.findOneAndRemove({ follower, followee })
    res.send('Unfollowed')
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  const {
    username, password, first_name, last_name, gender, introduction,
  } = req.body

  try {
    const user = await User.create({
      username, password, first_name, last_name, gender, introduction,
    })
    await Follow.create({ follower: user._id, followee: user._id })
    req.session.username = username
    req.session.user_id = user._id
    res.send('Account created')
  } catch (err) {
    next(err)
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      next(err)
    } else if (!user) {
      next('Invalid credentials!')
    } else {
      req.session.username = username
      req.session.user_id = user._id
      res.send('Logged in')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = undefined
  req.session.user_id = undefined
  res.send('Logged out')
})

module.exports = router
