const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const axios = require('axios');

router.get('/movies', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=the+hangover`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
	console.log(returnedData);
    res.render('ent-movie-info', {returnedData});
}).catch(function (error) {
	console.error(error);
});
});

module.exports = router;