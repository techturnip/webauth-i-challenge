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
router.post('/', (req, res) => {
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

// Export Router
// --------------------------------------------|
module.exports = router
