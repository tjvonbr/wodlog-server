const db = require("../data/db-config");

module.exports = {
  find,
  findBy,
  findById,
  add,
}

function find() {
  return db("users").select("id", "username", "email", "password")
}

function findBy(filter) {
  return db("users")
    .where( { filter })
    .first()
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id)
    })
}