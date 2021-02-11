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
/*         driver_package: requestData.driver_package,
        passenger_package: requestData.passenger_package,
        communications_package: requestData.communications_package,
        driver_assistance: requestData.driver_assistance, */
    })
    spreadshieldRequest.save()
    res.redirect('/spreadshield')
})
module.exports = router;