const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const cardDeck = require('../js/deckOfCards');


router.get('/', (req, res) => {
    const cards = cardDeck;
    console.log(cards);
    res.render('leisure-home', {cards});
});

/* All Games */
router.get('/all-games', (req, res) => {
    res.render('leisure-all-games');
})

/* Your Games */
router.get('/your-games', (req, res) => {
    res.render('leisure-your-games');
})

/* Leaderboards */
router.get('/leaderboards', (req, res) => {
    res.render('leisure-leaderboards');
})


/* Casino */
router.get('/casino', (req, res) => {
    res.render('leisure-casino');
})


/* Casino */
router.get('/games/jeopardy', (req, res) => {
	const options = {
        method: 'GET',
        url: `https://jservice.io/api/clues`
        };

        axios.request(options).then(function (response) {
            const returnedData = response.data;
            console.log(returnedData)
            res.render('leisure-jeopardy', {returnedData});
        }).catch(function (error) {
            console.error(error);
        });
})


module.exports = router;