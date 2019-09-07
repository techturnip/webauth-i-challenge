// bring in server
const server = require('./api/server.js')

// define port
const PORT = process.env.PORT || 4000

// call listen method
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
