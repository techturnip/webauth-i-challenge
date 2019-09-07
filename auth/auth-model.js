// DB Helper Methods
// --------------------------------------------|
const db = require('../data/dbConfig.js')
// --------------------------------------------|
const find = () => db('users').select('id', 'username', 'password')
// --------------------------------------------|
const findBy = filter => db('users').where(filter)
// --------------------------------------------|
const add = user =>
  db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids
      return findById(id)
    })
// --------------------------------------------|
const findById = id =>
  db('users')
    .where({ id })
    .first()

module.exports = {
  add,
  find,
  findBy,
  findById
}
