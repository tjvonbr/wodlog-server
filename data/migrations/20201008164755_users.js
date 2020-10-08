
exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table
        .increments()
      table
        .string("username")
        .notNullable()
        .unique()
      table
        .string("email")
        .notNullable()
        .unique()
      table
        .string("password")
        .notNullable()
      table
        .datetime("dateJoined")
        .defaultTo(new Date().toLocaleDateString())
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
