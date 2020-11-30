const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')
const Article = require('../models/article')
const Follow = require('../models/follow')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res, next) => {
  Follow.find({ follower: req.session.user_id }, (err1, follows) => {
    if (err1) {
      next(err1)
    } else {
      Article.find({
        author: {
          $in: follows.map(follow => follow.followee),
        },
      }, (err2, articles) => {
        if (err2) {
          next(err2)
        } else {
          res.send(articles.sort((a, b) => b.date - a.date))
        }
      }).populate('author', ['first_name', 'last_name', 'username'])
    }
  })
})

router.get('/user/:userId', isAuthenticated, async (req, res, next) => {
  const { userId } = req.params
  Article.find({ author: userId }, (err, articles) => {
    if (err) {
      next(err)
    } else {
      res.send(articles.sort((a, b) => b.date - a.date))
    }
  }).populate('author', ['first_name', 'last_name', 'username'])
})

router.get('/:articleId', isAuthenticated, async (req, res, next) => {
  const { articleId } = req.params
  Article.findOne({ _id: articleId }, (err, article) => {
    if (err) {
      next(err)
    } else if (!article) {
      next('Article not found!')
    } else {
      res.send(article)
    }
  }).populate('author', ['first_name', 'last_name', 'username'])
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { title, content } = req.body
  if (!title || !content) {
    next('You need to provide title and content!')
    return
  }
  try {
    res.send(await Article.create({
      author: req.session.user_id, title, content, date: new Date().getTime(),
    }))
  } catch (err) {
    next(err)
  }
})

module.exports = router
