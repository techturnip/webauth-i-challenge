// imports
// --------------------------------------------|
const express = require('express')
const helmet = require('helmet')

// bring in routers
// --------------------------------------------|
const usersRouter = require('../users/users-router.js')
const authRouter = require('../auth/auth-router.js')

// initialize express server
// --------------------------------------------|
const server = express()

// define global middlewares
// --------------------------------------------|
server.use(helmet())
server.use(express.json())

// define routes
// --------------------------------------------|
server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

// export
// --------------------------------------------|
module.exports = server
