const db = require('../data/db-config');
const knex = require("knex");

module.exports = {
  fetchAll,
  fetchById,
  fetchExercises,
  addWorkout
}

function fetchAll() {
  return db("workouts")
}

function fetchById(id) {
  return db("workouts")
    .where({ id })
    .first()
}

function fetchExercises(exercise) {
  return db("workouts")
    .select("*").from("workouts").where(knex.raw('description SIMILAR to ?', [exercise]))
}

function addWorkout(workout) {
  console.log("test")
  return db("workouts")
    .insert(workout)
    .then(newWorkout => {
      const [saved] = newWorkout;
      return fetchById(saved);
    })
}
