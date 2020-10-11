const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Company = require('../models/Company');


router.get('/', async (req, res) => {
    const companies = await Company.find({});
    console.log(`Companies: ${companies}`)
    res.render('business-main', {currentPageTitle: 'Business', companies});
})

router.get('/add-new-business', ensureAuthenticated, (req, res) => {
    res.render('business-new', {currentPageTitle: 'Add New Business'});
})

router.post('/add-new-business', ensureAuthenticated, (req, res) => {
    const userId = req.user._id;
    const company = new Company({
        companyOwner: userId,
        company_name: req.body.company_name,
        company_bio: req.body.company_bio,
        company_street_1: req.body.company_street_1,
        company_street_2: req.body.company_street_2,
        company_suite_number: req.body.company_suite_number,
        company_city: req.body.company_city,
        company_state: req.body.company_state,
        company_zip: req.body.company_zip,
        company_country: req.body.company_country,
        company_type: req.body.company_type,
        company_phone: req.body.company_phone,
        company_fax: req.body.company_fax,
        company_main_email: req.body.company_main_email

    })
    company.save()
    res.redirect('/business');
})

 router.get('/:id', async (req, res) => {
    const companyId = req.params.id
    const companies = await Company.find({companyId});
    res.render('business-home', {currentPageTitle: 'Business', companies});
})
 

module.exports = router;