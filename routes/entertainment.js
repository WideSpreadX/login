const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const axios = require('axios');


router.get('/', (req, res) => {
    res.render('ent-home');
})
router.get('/movies', (req, res) => {
    res.render('movies-home');
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
    res.render('ent-movie-info', {returnedData});
}).catch(function (error) {
	console.error(error);
});
});

router.get('/movies/movie/run-hide-fight', (req, res) => {
    const movie = 'https://www.2embed.ru/embed/tmdb/movie?id=629017';

    res.render('rhf', {movie});
})
module.exports = router;