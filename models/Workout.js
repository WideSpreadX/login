const mongoose = require('mongoose');


const WorkoutSchema = new mongoose.Schema({
    exercise: String,
    set1: {
        weight: Number,
        reps: Number,
    },
    set2: {
        weight: Number,
        reps: Number,
    },
    set3: {
        weight: Number,
        reps: Number,
    },
    set4: {
        weight: Number,
        reps: Number,
    },
    set5: {
        weight: Number,
        reps: Number,
    },
    max_weight: Number,
    max_reps: Number,
    date: {
        type: Date,
        default: Date.now()
    }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;