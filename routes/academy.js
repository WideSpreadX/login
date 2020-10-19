const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');


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
            console.log(`This is the selected course: ${courseData.course}`);
            console.log(`These are the Classes in this Course: ${courseClasses}`);
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
            {$push: {classes: aClass._id}},
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


router.get('/courses/:courseId/:classId', ensureAuthenticated, (req, res) => {
    res.render('class-page', {currentPageTitle: 'Classroom'});
});
module.exports = router;