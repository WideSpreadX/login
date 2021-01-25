const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const axios = require('axios');


// Tools Home
router.get('/', (req, res) => {
    const word = 'widespread';

	const options = {
  method: 'GET',
  url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
  headers: {
    'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79',
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
	console.log(returnedData);
    res.render('tools-home', {returnedData});
}).catch(function (error) {
	console.error(error);
});

});

router.get('/dictionary', (req, res) => {
  res.render('tools-dictionary');
})
router.post('/dictionary', (req, res) => {
  const word = req.body.word;
  res.redirect(`/tools/dictionary-definition/${word}`);
})
router.get('/dictionary-definition/:word', (req, res) => {
    const word = req.params.word;

	const options = {
  method: 'GET',
  url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
  headers: {
    'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79',
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
    const returnedData = response.data;
	console.log(returnedData);
    res.render('tools-dictionary-word', {returnedData});
}).catch(function (error) {
	console.error(error);
});
})

module.exports = router;