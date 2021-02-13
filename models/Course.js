const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    courseCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    subject: String,
    course: String,
    difficulty: String,
    classes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],
    credit_value: Number,
    background_image: String
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;