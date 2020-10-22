const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');


router.get('/', ensureAuthenticated, (req, res) => {
    res.render('spreadshield-home', {currentPageTitle: 'SpreadShield'})
})

module.exports = router;