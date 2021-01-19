const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Company = require('../models/Company');
const Resume = require('../models/Resume');
const Item = require('../models/Item');
const { populate } = require('../models/User');


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

 router.get('/your-desk', async (req, res) => {
    const thisUser = req.user.id;
    const userData = await User.findById(thisUser);
    const userResume = await Resume.find({resumeOwner: {$eq: thisUser} });
    res.render('business-your-desk', {currentPageTitle: 'Your Business Desk', userData, userResume});
})
 router.get('/:companyId', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    Company.findById(companyId)
    console.log(`Company Info: ${company}`)
    res.render('business-home', {currentPageTitle: 'Business', company});
})
router.post('/add-subpage', ensureAuthenticated, (req, res) => {
    const companyId = req.body.companyId;
    const subpageName = req.body.subpage_name;
    Company.findByIdAndUpdate(companyId, 
        {$push: {subpages: subpageName}},
        {safe: true, upsert: true},
        function(err, doc) {
          if(err) {
            console.log(err)
          } else {
            return
          }
        })

        res.redirect(`/business/${companyId}`)
})
router.get('/:companyId/manage', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId).populate({
        path: 'job_applicants',
        model: 'Resume',
        populate: {
            path: 'resumeOwner',
            model: 'User',
            populate: {
                path: 'resume',
                model: 'Resume'
            }
        }
    });
    const jobApplicant = await Company.findById(companyId);
    Company.findById(companyId)
    console.log(`Company Info to Manage: ${company}`)
    res.render('business-manage', {currentPageTitle: 'Manage Company', company, jobApplicant});
})

router.get('/:companyId/resume/applicant/:applicantId', async (req, res) => {
    const companyId = req.params.companyId;
    const applicantId = req.params.applicantId;
    const resumeOwner = await Resume.findById(applicantId).populate('resumeOwner')
    const resume = await Resume.findById(applicantId);
    const company = await Company.findById(companyId);
    console.log(`Company Departments: ${company.departments}`)
    res.render('business-see-applicant', {currentPageTitle: 'Job Applicant', resume, resumeOwner, company})
})


router.get('/:companyId/:resumeId/add-employee', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    const resumeId = req.params.resumeId;
    const resumeObject = Resume.findById(resumeId).populate('resumeOwner');
    console.log(`Resume Owner: ${resumeOwner}`);
    const userId = req.user._id;
    User.findById(userId);
    Company.findById(companyId)
    console.log(`Company Info to Manage: ${company}`)
    res.render('add-employee', {currentPageTitle: 'Add New Employee', company, userId, resumeOwner})
})


router.post('/:companyId/add-employee', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    const userId = req.user._id;
    const newEmployee = req.body.newEmployee;
    const company = await Company.findByIdAndUpdate(companyId,
        {$addToSet: {employees: newEmployee}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err) {
                console.log(err)
            } else {
                return
            }
        }
        )
    company.save();        
    res.redirect(`/business/${companyId}/manage`)
});


router.get('/:companyId/inventory', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    const companyInventory = await Item.find({ for_company: { $eq: companyId } });
        console.log(`Company Info to Manage: ${company}`)
        res.render('inventory', {currentPageTitle: 'Inventory', company, companyInventory})
    ;
});


router.post('/:companyId/inventory', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    const item = new Item({
        for_company: companyId,
        name: req.body.name,
        description: req.body.description,
        sku: req.body.sku,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        price: req.body.price,
        color1: req.body.color1,
        color2: req.body.color2,
        dimensions: {
            width: req.body.width,
            height: req.body.height,
            depth: req.body.depth
        },
        weight: req.body.weight,
        category: req.body.category
    })
    item.save()
    await Company.findByIdAndUpdate(companyId,
        {$addToSet: {inventory: item._id}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                
                return
            }
        }
        )
    res.redirect(`/business/${companyId}/inventory`)
});


module.exports = router;