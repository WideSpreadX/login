const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const { createClient } = require('pexels');
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

router.get('/photospread/pexels', (req, res) => {
    res.render('photospread-pexels');
});
router.post('/photospread/pexels/search', (req, res) => {
    const query = req.body.search;

    res.redirect(`/socialspread/photospread/pexels/search/${query}`);
});

router.get('/photospread/pexels/search/:query', (req, res) => {
    const client = createClient(process.env.PEXELS_API_KEY);

    const query = req.params.query;

    client.photos.search({ query, per_page: 50 }).then(photos => {
        console.log(photos)
        res.render('photospread-pexels-results', {photos})
    });
});



router.get('/photospread/pexels/single/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const client = createClient(process.env.PEXELS_API_KEY);
    client.photos.show({ id: imageId }).then(photo => {
        console.log(photo);
        res.render('photospread-pexels-single', {photo})
    });
});


router.get('/videospread/pexels/search', (req, res) => {
    res.render('videospread-pexels-search')
});

router.post('/videospread/pexels/search', (req, res) => {
    const query = req.body.search;

    res.redirect(`/socialspread/videospread/pexels/search/${query}`)
});

router.get('/videospread/pexels/search/:term', (req, res) => {
    const query = req.params.term;
    const client = createClient(process.env.PEXELS_API_KEY);
    client.videoes.search({ query, per_page: 1 }).then(videos => {
        console.log(videos);
        res.render('videospread-pexels-results', {videos});
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