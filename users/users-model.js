// bring in db operations
const db = require('../data/dbConfig.js')

// define db helpers
const find = () => db('users').select('id', 'username')

const findBy = filter => db('users').where(filter)

const findById = id =>
  db('users')
    .where({ id })
    .first()

const add = async user => {
  const [id] = await db('users').insert(user)

  return findById(id)
}

// export helpers
module.exports = {
  add,
  find,
  findBy,
  findById
}
