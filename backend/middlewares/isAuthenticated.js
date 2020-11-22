const isAuthenticated = (req, res, next) => {
  const { username } = req.session
  if (username) {
    next()
  } else {
    next('You are not authorized!')
  }
}

module.exports = isAuthenticated
