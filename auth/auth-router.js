// Bring in express router & bcrypt
// --------------------------------------------|
const router = require('express').Router()
const bcrypt = require('bcryptjs')

// Bring in DB Helper Methods
// --------------------------------------------|
const Users = require('../users/users-model')

// Auth router endpoint base '/api/auth'
// --------------------------------------------|
// POST Request registers a new user in the db
// --------------------------------------------|
router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  Users.add(user)
    .then(saved => {
      // add user info to the session
      req.session.user = user
      // send back a cookie
      res.status(201).json(saved)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
})

// POST Request logs in a user
// --------------------------------------------|
router.post('/login', (req, res) => {
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // add user info to the session
        req.session.user = users

        res.status(200).json({
          message: `Welcome ${user.username}!`
        })
      } else {
        res.status(200).json({
          message: 'Invalid credentials'
        })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// GET Request logout a user
// --------------------------------------------|
router.get('/logout', (req, res) => {
  if (req.session) {
    res.session.destroy(err => {
      if (err) {
        res.json({
          message: "Well, that's unfortunate, guess you're stickin' around!"
        })
      } else {
        res.end()
      }
    })
  }
})

// Export Router
// --------------------------------------------|
module.exports = router
