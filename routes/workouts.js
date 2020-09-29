const express = require('express');
const router = express.Router();
const workouts = require('../models/workouts-models');
const validateWorkout = require("../middleware/validateWorkout");

// Fetch all workouts
router.get("/", (req, res) => {
  workouts.fetchAll()
    .then(workouts => {
      res.status(200).json(workouts)
    })
    .catch(error => {
      console.log(error);
    })
})

// Fetch all workouts with keyword
router.get('/:exercise', (req, res) => {
  const { exercise } = req.params;
  console.log(exercise)

  workouts.fetchExercises(exercise)
    .then(workoutsWith => {
      res.status(200).json(workoutsWith);
    })
    .catch(error => {
      console.log(error);
    })
})

// Add a new workout
router.post("/", (req, res) => {
  const workout = req.body;

  function alterDate(date) {
    const _date = date.replace("-", "/")
    const finalDate = _date.split("")

    console.log(finalDate[0])
    return finalDate[0]
  }

  workouts.addWorkout(workout)
    .then(savedWorkout => {
      res.status(201).json({
        id: savedWorkout.id,
        created_at: savedWorkout.postDate,
        type: savedWorkout.type,
        description: savedWorkout.description,
        notes: savedWorkout.notes
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Sorry, but we weren't able to add your workout!"
      })
    })
})

module.exports = router;
