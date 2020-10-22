const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');


router.get('/', ensureAuthenticated, (req, res) => {
    res.render('socialspread-home', {currentPageTitle: 'SocialSpread'})
})

module.exports = router;