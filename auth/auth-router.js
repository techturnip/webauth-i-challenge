// Bring in express router & bcrypt
// --------------------------------------------|
const router = require('express').Router()
const bcrypt = require('bcryptjs')

// Bring in DB Helper Methods
// --------------------------------------------|
const DB = require('../auth/auth-model')

// User router endpoint base '/api/users'
// --------------------------------------------|

// GET Request returns a list of users
// --------------------------------------------|
router.get('/', restricted, (req, res) => {})

// Define restricted middleware
function restricted(req, res, next) {
  if (username && password) {
    DB.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next()
        } else {
          res.status(401).json({ message: 'hmmm...' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'unexpected error' })
      })
  } else {
    res.status(400).json({ message: 'please provide username and password' })
  }
}

// Export Router
// --------------------------------------------|
module.exports = router
