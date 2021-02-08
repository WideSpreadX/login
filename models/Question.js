const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    question_body: String,
    category: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
    resolved: Boolean,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;