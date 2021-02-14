const mongoose = require('mongoose');


const classSchema = new mongoose.Schema({
    inCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    classCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    description: String,
    segments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Segment'}],
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    test: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    class_color: String
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;