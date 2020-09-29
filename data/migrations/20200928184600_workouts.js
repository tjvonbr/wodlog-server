
exports.up = function(knex) {
  return knex.schema
    .createTable("workouts", table => {
      table
        .increments()
      table
        .datetime("postDate")
        .defaultTo(new Date().toLocaleDateString())
      table
        .string("type")
        .notNullable()
      table
        .text("description")
        .notNullable()
      table
        .text("notes")
        .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("workouts")
};
