const express = require('express');
const router = express.Router();
const workouts = require('../models/workouts-models');

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

  workouts.addWorkout(workout)
    .then(savedWorkout => {
      res.status(201).json(savedWorkout)
    })
    .catch(error => {
      console.log(error);
    })
})


module.exports = router;
