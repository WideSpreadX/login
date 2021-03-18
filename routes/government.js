const express = require('express');
const router = express.Router();

const axios = require('axios');


const {ensureAuthenticated } = require('../config/auth');


router.get('/', ensureAuthenticated, (req, res) => {
    const state = 'NJ';
	const options = {
        method: 'GET',
        url: `http://www.opensecrets.org/api/?method=getLegislators&id=${state}&apikey=${process.env.OPEN_SECRETS_API_KEY}&output=json`
        };

        axios.request(options).then(function (response) {
            const returnedData = response.data;
            console.log(returnedData)
            res.render('gov-home', {currentPageTitle: 'Government Home'})
        }).catch(function (error) {
            console.error(error);
        });
});

    

module.exports = router;