const db = require('../../database/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add,
}

function find() {
  return db('users');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}
