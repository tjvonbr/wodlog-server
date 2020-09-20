const knex = require("knex");
const config = require("../knexfile");
const dbenv = process.env.DB_ENV || "development"

module.exports = knex(config[dbenv]);
