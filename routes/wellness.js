const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const cheerio = require('cheerio');

const User = require('../models/User');
const Workout = require('../models/Workout');
const WorkoutSchedule = require('../models/WorkoutSchedule');

router.get('/', (req, res) => {
    res.render('wellness-home', {currentPageTitle: 'Wellness Home'});
});


// Your Plans
router.get('/your-plans', async (req, res) => {
    const user = req.user._id;
     const workouts = await Workout.find({});
     const workoutSchedule = await WorkoutSchedule.find({user: {$eq: user}})
    res.render('wellness-your-plans', {currentPageTitle: 'Your Plans', user, workouts, workoutSchedule});
});
router.post('/your-plans/exercise', ensureAuthenticated, async (req,res) => {
    const userId = req.user._id;

    const exercise = new Workout({
        exercise: req.body.exercise
    })
    exercise.save()
    console.log(`Exercise Added: ${exercise}`)
    res.redirect('/wellness/your-plans');
})
router.post('/your-plans/add', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const exercise = Workout.findById({
       exercise: {$eq: req.body} 
    })

    const workoutSchedule = new WorkoutSchedule({
        sunday: req.body.sunday,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wendnesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        user: userId,
    })

    await User.findByIdAndUpdate(userId,
        {$addToSet: {workouts: workoutSchedule._id}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                workoutSchedule.save()
                return
            }
        }
        )
        res.redirect('/wellness/your-plans');
});
router.get('/workout', (req, res) => {

    axios.get("https://www.muscleandfitness.com/athletes-celebrities/news/").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

        $('.l-main__content').children('article').each(function(i, element) {

        const title = $(element).children('.article__content').children('.article__title').children('a').text();
        const articleImage = $(element).children('.article__thumbnail').children('.article__figure').children('img').attr('src');
        const link = $(element).children('.article__content').children('.article__title').children('a').attr('href');
        const newsPreview = $(element).children('.article__content').children('.article__subtitle').text();
     
        results.push({
        title: title,
        articleImage: articleImage,
        link: link,
        newsPreview: newsPreview,
        });
        });
        console.log(results);
    res.render('wellness-workout', {currentPageTitle: 'Workout Home', results});
});
});

// Yoga
router.get('/yoga', (req, res) => {

    res.render('wellness-yoga', {currentPageTitle: 'Yoga Home'});
});



// Nutrition
router.get('/nutrition', (req, res) => {
    user = req.user._id;

    res.render('wellness-nutrition', {currentPageTitle: 'Nutrition'});
});
module.exports = router;
