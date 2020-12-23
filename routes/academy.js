const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Flashcard = require('../models/Flashcard');
const LearningPoint = require('../models/LearningPoint');
const Quiz = require('../models/Quiz');


router.get('/', ensureAuthenticated, (req, res) => {
    res.render('academy-main', {currentPageTitle: 'Academy Main'})
});

router.get('/courses', ensureAuthenticated, async (req, res) => {
    const courses = await Course.find({});
    console.log(`Courses: ${courses}`)
    res.render('academy-all-courses', {currentPageTitle: 'All Courses', courses})
});

router.get('/add-course', ensureAuthenticated, (req, res) => {

    res.render('add-course', {currentPageTitle: 'Add New Course'});
});

router.post('/add-course', ensureAuthenticated, (req, res) => {
    const course = new Course({
        subject: req.body.subject,
        course: req.body.course,
        difficulty: req.body.difficulty,
        credit_value: req.body.credit_value
    })
    course.save()
    res.redirect('/academy/courses');
})

router.get('/courses/:courseId', ensureAuthenticated, (req, res) => {
    const thisCourse = req.params.courseId;
    console.log(`Course ID: ${thisCourse}`)
    const course = Course.findById(thisCourse);
    Course.findById(thisCourse)
    .populate('classes')
    .exec()
    .then(courseData => {
            const courseClasses = Class.find({inCourse: {$eq: thisCourse}});
            Class.find({inCourse: {$eq: thisCourse}});
/*             console.log(`This is the selected course: ${courseData.course}`);
            console.log(`These are the Classes in this Course: ${courseClasses}`); */
            res.render('course-home', {courseData, courseClasses})
            console.log(`courseData: ${courseData.classes.name}`);
        });
})
router.get('/courses/:courseId/add-class', ensureAuthenticated, (req, res) => {
    const course = req.params.courseId;
    const courseInfo = Course.findById({course})
    Course.findById({course})
    console.log(`Course Info: ${courseInfo}`)
    console.log(`Course: ${course}`)
    res.render('add-class', {currentPageTitle: 'Add New Class', course, courseInfo});
});

router.post('/courses/:courseId/add-class', ensureAuthenticated, async (req, res) => {
    const thisCourseId = req.params.courseId;
    const creator = req.user._id;
    const aClass = new Class({
        inCourse: thisCourseId,
        classCreator: creator,
        name: req.body.name,
        description: req.body.description
    })
    aClass.save()
    console.log(`New Class: ${aClass}`)
    await Course.findByIdAndUpdate(thisCourseId,
            {$addToSet: {classes: aClass._id}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    console.log(err);
                }else{
                    
                    return
                }
            }
            )
            
    
    res.redirect(`/academy/courses/${thisCourseId}`);
})


router.get('/courses/:courseId/:classId', ensureAuthenticated, async (req, res) => {
    const classId = req.params.classId;
    const thisCourseId = req.params.courseId;
    const thisClass = await Class.findById(classId);
    const thisCourse = await Course.findById(thisCourseId);
    console.log(`This Class is: ${thisClass}`)
    console.log(`for Course: ${thisCourse}`)
    const learningPoints = await LearningPoint.find({class: {$eq: classId}})
    learningPoints
    .exec(
        res.render('class-page', {currentPageTitle: 'Classroom', learningPoints, thisClass, thisCourseId})
        )
});


router.post('/:classId/add-learning-point', ensureAuthenticated, (req, res) => {
    const classId = req.params.classId;
    const learningPoint = new LearningPoint({
        class: classId,
        section_header: req.body.section_header,
        section_body: req.body.section_body,
        section_notes: req.body.section_notes,
        difficulty: req.body.difficulty
    })
    learningPoint.save()
    console.log(`New Learning Point: ${learningPoint}`)
    res.redirect(`/academy/courses`)
});
router.get('/:classId/add-learning-point', ensureAuthenticated, (req, res) => {
    const classId = req.params.classId;
    res.render('academy-add-learning-point')

});

router.post('/:learningPointId/add-quiz', ensureAuthenticated, (req, res) => {
    const learningPointId = req. params.learningPointId;
    const learningPointQuiz = new Quiz({
        forLearningPoint: learningPointId,
            question1: req.body.question1,
            answer1: req.body.answer1,
            difficulty1: req.body.difficulty1,
            question2: req.body.question2,
            answer2: req.body.answer2,
            difficulty2: req.body.difficulty2,
            question3: req.body.question3,
            answer3: req.body.answer3,
            difficulty3: req.body.difficulty3,
            question4: req.body.question4,
            answer4: req.body.answer4,
            difficulty4: req.body.difficulty4,
            question5: req.body.question5,
            answer5: req.body.answer5,
            difficulty5: req.body.difficulty5,
    })
    learningPointQuiz.save()
    console.log(`New Quiz: ${learningPointQuiz}`)
    res.redirect(`/academy/courses`)
});

router.get('/:learningPointId/add-quiz', ensureAuthenticated, (req, res) => {
    const learningPointId = req.params.learningPointId;
    res.render('academy-add-quiz')


});

router.post('/:classId/add-flashcard', ensureAuthenticated, (req, res) => {
    const classId = req.params.classId;
    const thisCourseId = req.params.courseId;
    const flashcard = new Flashcard({
        class: classId,
        question: req.body.question,
        answer: req.body.answer,
        difficulty: req.body.difficulty
    })
    flashcard.save()
    console.log(`New Class: ${flashcard}`)
    res.redirect(`/academy/courses`)
});

router.get('/:classId/flashcards', ensureAuthenticated, async (req, res) => {
    const classId = req.params.classId;
    const thisClass = await Class.findById(classId);
    const flashcards = await Flashcard.find({class: {$eq: classId}});
    res.render('flashcards', {currentPageTitle: 'Flashcards', flashcards, thisClass})

})

module.exports = router;