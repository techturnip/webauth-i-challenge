// Bring in express router & bcrypt
// --------------------------------------------|
const router = require('express').Router()

// Bring in DB Helper Methods
// --------------------------------------------|
const Users = require('./users-model.js')
const restricted = require('../auth/restricted-middleware.js')

// User router endpoint base '/api/users'
// --------------------------------------------|
// GET Request returns a list of users
// --------------------------------------------|
router.get('/', restricted, async (req, res) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Unable to retrieve users'
    })
  }
})

// Export Router
// --------------------------------------------|
module.exports = router
