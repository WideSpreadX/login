const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');

const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', (req, res) => {
    res.render('socialspread-home')
});

router.get('/user/:id', ensureAuthenticated, (req, res) => {

    const id = req.user._id;
    const friends = req.user.friends;
    res.render('socialspread-user', {currentPageTitle: 'SocialSpread'})
});

router.get('/photospread', (req, res) => {
    const apiKey = process.env.UNSPLASH_ACCESS_TOKEN
	const options = {
  method: 'GET',
  url: `https://api.unsplash.com/photos/?per_page=100&client_id=${apiKey}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
    console.log(returnedData)
    res.render('photospread', {returnedData});
}).catch(function (error) {
	console.error(error);
});

});

router.get('/giphyspread', (req, res) => {
    
    const apiKey = process.env.GIPHY_API_KEY
	const options = {
  method: 'GET',
  url: `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=50&rating=r`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
    console.log(returnedData)
    res.render('giphyspread', {returnedData});
}).catch(function (error) {
	console.error(error);
});

});

router.post('/giphyspread/search', (req, res) => {
    const term = req.body.search;
    res.redirect(`/socialspread/giphyspread/search/${term}`)
})
router.get('/giphyspread/search/:term', (req, res) => {
    const term = req.params.term
    const apiKey = process.env.GIPHY_API_KEY
	const options = {
  method: 'GET',
  url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${term}&limit=50&offset=0&rating=r&lang=en`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
    console.log(returnedData)
    res.render('giphyspread-results', {returnedData});
}).catch(function (error) {
	console.error(error);
});
});
module.exports = router;