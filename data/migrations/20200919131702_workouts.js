
exports.up = function(knex) {
  return knex.schema
    .createTable("workouts", table => {
      table
        .increments()
      table
        .timestamps(true, true)
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
