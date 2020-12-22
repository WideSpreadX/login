const mongoose = require('mongoose');


const WorkoutSchema = new mongoose.Schema({
    exercise: String,
    sets: Number,
    reps: Number,
    max_weight: Number,
    max_reps: Number
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;