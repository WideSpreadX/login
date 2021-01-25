const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const http = require('http')
const unirest = require('unirest');
// SpreadBubble Home
router.get('/', (req, res) => {
    const test = unirest.get('https://geocoder.api.here.com/search/6.2/geocode.json&apiKey={' + process.env.HERE_API_KEY + '}')
    console.log(test)
    res.render('spreadbubble-home');
});


module.exports = router;