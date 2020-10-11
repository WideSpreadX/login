const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');


router.get('/', ensureAuthenticated, (req, res) => {
    res.render('academy-main', {currentPageTitle: 'Academy Main'})
});

router.get('/courses', ensureAuthenticated, (req, res) => {
    res.render('academy-all-courses', {currentPageTitle: 'All Courses'})
});

router.get('/add-course', ensureAuthenticated, (req, res) => {
    res.render('add-course', {currentPageTitle: 'Add New Course'});
});

router.post('/add-course', ensureAuthenticated, (req, res) => {
    const userId = req.user._id;
    const course = new Course({
        subject: req.body.subject,
        course: req.body.course,
        difficulty: req.body.difficulty,
        credit_value: req.body.credit_value
    })
    company.save()
    res.redirect('/academy/courses');
})
module.exports = router;