const mongoose = require('mongoose');


const WorkoutSchema = new mongoose.Schema({
    teammate: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    exercise: String,
    sets: Number,
    reps: Number,
    max: Number,
    days: [String]

});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;