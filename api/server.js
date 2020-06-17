// imports
// --------------------------------------------|
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// package to handle sessions/cookies
const session = require('express-session')
// package to connect sessions to database
const connectSessionKnex = require('connect-session-knex')

// bring in routers
// --------------------------------------------|
const usersRouter = require('../users/users-router.js')
const authRouter = require('../auth/auth-router.js')

// bring in db
const db = require('../data/dbConfig.js')

// initialize express server
// --------------------------------------------|
const server = express()

// HOOK UP SESSIONS
// create Session Store
// --------------------------------------------|
const KnexSessionStore = connectSessionKnex(session)
// set up express-session config
const sessionConfig = {
  name: 'heroes of azeroth',
  // secret should not be hardcoded in...
  secret: 'must construct additional pylons',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // should be true in production
    httpOnly: true // the browser cant access via js
  },
  resave: false,
  saveUninitialized: false,
  // store sessions in DB
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

// define global middlewares
// --------------------------------------------|
server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

// define routes
// --------------------------------------------|
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

// export
// --------------------------------------------|
module.exports = server
