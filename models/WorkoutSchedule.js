const mongoose = require('mongoose');


const WorkoutScheduleSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    day: {
        sunday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
        monday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
        tuesday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
        wednesday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
        thursday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
        friday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
        saturday: {
            exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}],
        },
       
    }

});

const WorkoutSchedule = mongoose.model('WorkoutSchedule', WorkoutScheduleSchema);

module.exports = WorkoutSchedule;