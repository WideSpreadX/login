const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
     const workoutSchedule = await WorkoutSchedule.findOne({user: {$eq: user}}).populate('sunday').populate('monday').populate('monday').populate('tuesday').populate('wednesday').populate('thursday').populate('friday').populate('saturday').exec()
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




/*     const exercise = Workout.findById({
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
        ) */
        res.redirect('/wellness/your-plans');
});

router.patch('/your-plans/add/sunday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.sunday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {sunday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});

router.patch('/your-plans/add/monday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.monday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {monday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});

router.patch('/your-plans/add/tuesday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.tuesday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {tuesday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});

router.patch('/your-plans/add/wednesday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.wednesday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {wednesday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});

router.patch('/your-plans/add/thursday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.thursday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {thursday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});

router.patch('/your-plans/add/friday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.friday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {friday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});

router.patch('/your-plans/add/saturday', async (req, res) => {
    const userId = req.user._id;
    const exercisesAdded = req.body.saturday;
    exercisesAdded.forEach(turnObjectId);

    function turnObjectId(item, index, arr) {
        arr[index] = mongoose.Types.ObjectId(item)
    }
    console.log(exercisesAdded)
     const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
        {$addToSet: {saturday: exercisesAdded }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                0
                return
            }
        }
        )
    added.save()
    res.redirect('/wellness/your-plans')
});


router.get('/your-plans/session/sunday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('sunday').populate('sunday').exec()

    res.render('wellness-workout-sunday', {workout})
});

router.get('/your-plans/session/monday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('monday').populate('monday').exec()

    res.render('wellness-workout-monday', {workout})
});

router.get('/your-plans/session/tuesday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('tuesday').populate('tuesday').exec()

    res.render('wellness-workout-tuesday', {workout})
});

router.get('/your-plans/session/wednesday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('wednesday').populate('wednesday').exec()

    res.render('wellness-workout-wednesday', {workout})
});

router.get('/your-plans/session/thursday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('thursday').populate('thursday').exec()

    res.render('wellness-workout-thursday', {workout})
});

router.get('/your-plans/session/friday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('friday').populate('friday').exec()

    res.render('wellness-workout-friday', {workout})
});

router.get('/your-plans/session/saturday', async (req, res) => {
    const user = req.user._id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('saturday').populate('saturday').exec()

    res.render('wellness-workout-saturday', {workout})
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
