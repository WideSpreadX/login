const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('ent-home');
})
router.get('/movies', (req, res) => {
    res.render('movies-home');
})
router.get('/movies-user', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log(`User Movies: ${user.movie_list}`);
    const movieList = user.movie_list; 

    res.render('movies-home-user', {movieList});

})
router.post('/movies/search', (req, res) => {
    const movie = req.body.movie;
    const movieString = req.body.movie;
    console.log(movieString.replace(/\s/g, '+'));
    const convertedString = movieString.replace(/\s/g, '+')
    res.redirect(`/entertainment/movies/${convertedString}`);
})
router.get('/movies/:movie', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
	console.log(returnedData);

    res.render('ent-movie-info', {returnedData, movie});
}).catch(function (error) {
	console.error(error);
});
});



router.get('/movies/:movie/vr', async (req, res) => {
    const movie = req.params.movie;

    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
	console.log(returnedData);

    res.render('ent-movie-info-vr', {layout: './layouts/vr-ar', returnedData, movie});
}).catch(function (error) {
	console.error(error);
});
})
router.get('/movies/:movie/spreadshield', async (req, res) => {
    const movie = req.params.movie;

    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
	console.log(returnedData);

    res.render('ent-movie-info-spreadshield', {returnedData, movie});
}).catch(function (error) {
	console.error(error);
});
})

router.post('/movies/save', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const movieLink = req.body.movie_title;
    const movieName = req.body.movie_name;
    await User.findByIdAndUpdate(user, 
            {$addToSet: {movie_list: {movie_link: movieLink, movie_name: movieName}}},
        )
    res.redirect(`/entertainment/movies/${movieName}`)
})

module.exports = router;