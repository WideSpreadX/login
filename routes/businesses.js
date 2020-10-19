const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Company = require('../models/Company');
const Resume = require('../models/Resume');


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
        company_main_email: req.body.company_main_email,
        company_website: req.body.company_website
    })
    company.save()
    res.redirect('/business');
})

 router.get('/:companyId', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    Company.findById(companyId)
    console.log(`Company Info: ${company}`)
    res.render('business-home', {currentPageTitle: 'Business', company});
})

router.get('/:companyId/manage', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    Company.findById(companyId)
    console.log(`Company Info to Manage: ${company}`)
    res.render('business-manage', {currentPageTitle: 'Manage Company', company});
})



router.get('/:companyId/add-employee', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    const userId = req.user._id;
    User.findById(userId);
    Company.findById(companyId)
    console.log(`Company Info to Manage: ${company}`)
    res.render('add-employee', {currentPageTitle: 'Add New Employee', company, userId})
})


router.post('/:companyId/add-employee/:resumeId', ensureAuthenticated, (req, res) => {
    const companyId = req.params.companyId;
    const resumeId = req.params.resumeId;
    const userId = req.user._id;
    
    Resume.findOne({'resumeOwner': userId}, '_id', (err, newEmployee) => {
        if (err) {
            return
        } else {
            Company.findByIdAndUpdate(companyId, 
                {$push: {job_applicants: newEmployee}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err) {
                        console.log(err);
                    } else {
                        return
                    }
                }
                )
        }
    })
    .then(
        res.redirect('/business')
    )

})


module.exports = router;