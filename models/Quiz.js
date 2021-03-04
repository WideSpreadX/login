const mongoose = require('mongoose');


const QuizSchema = new mongoose.Schema({
    forClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    questions: [
        {
            question: String,
            options: [String],
            answer: Number,
            difficulty: Number
        }
    ]
/*     question1: String,
    question1_option1: String,
    question1_option2: String,
    question1_option3: String,
    question1_option4: String,
    answer1: String,
    difficulty1: Number,
    question2: String,
    question2_option1: String,
    question2_option2: String,
    question2_option3: String,
    question2_option4: String,
    answer2: String,
    difficulty2: Number,
    question3: String,
    question3_option1: String,
    question3_option2: String,
    question3_option3: String,
    question3_option4: String,
    answer3: String,
    difficulty3: Number,
    question4: String,
    question4_option1: String,
    question4_option2: String,
    question4_option3: String,
    question4_option4: String,
    answer4: String,
    difficulty4: Number,
    question5: String,
    question5_option1: String,
    question5_option2: String,
    question5_option3: String,
    question5_option4: String,
    answer5: String,
    difficulty5: Number,
    score: Number */
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;