const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const SpreadshieldRequest = require('../models/SpreadshieldRequest');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('spreadshield-home', {currentPageTitle: 'SpreadShield'})
})

router.post('/request-unit', (req, res) => {
    const requestData = req.body;

    const spreadshieldRequest = new SpreadshieldRequest({
        fname: requestData.fname,
        lname: requestData.lname,
        email: requestData.email,
        phone: requestData.phone,
        make: requestData.make,
        model: requestData.model,
        year: requestData.year,
        questions: requestData.questions
    })
    spreadshieldRequest.save()
    res.redirect('/spreadshield')
})
module.exports = router;