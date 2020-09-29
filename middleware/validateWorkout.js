// Validates the workout schema
 module.exports = function validateWorkout(workout, next) {
  console.log(`Your workout consisted of: ${workout}`)
  next()
}
