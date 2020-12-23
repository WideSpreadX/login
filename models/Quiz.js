const mongoose = require('mongoose');


const QuizSchema = new mongoose.Schema({
    forLearningPoint: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningPoint'},
    question1: String,
    answer1: String,
    difficulty1: Number,
    question2: String,
    answer2: String,
    difficulty2: Number,
    question3: String,
    answer3: String,
    difficulty3: Number,
    question4: String,
    answer4: String,
    difficulty4: Number,
    question5: String,
    answer5: String,
    difficulty5: Number,
    score: Number
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;