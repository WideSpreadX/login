const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Company = require('../models/Company');
const Subpage = require('../models/Subpage');
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
    const subPages = await Subpage.find({company_site: {$eq: companyId} })
    Company.findById(companyId)
    console.log(`Company Info: ${company}`)
    res.render('business-home', {currentPageTitle: 'Business', company, subPages});
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
    }).exec()
    const employee = await Company.findById(companyId).populate({
        path: 'employees',
        model: 'User'
    })
    .populate({
        path: 'job_applicants',
        model: 'User'
    })
    .populate({
        path: 'companyOwner',
        model: 'User'
    })
    .exec()

    console.log(`Company Info to Manage: ${company}`)
    res.render('business-manage', {currentPageTitle: 'Manage Company', company, employee});
})

router.get('/:companyId/manage/public-page', async (req, res) => {
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    const subpages = await Subpage.find({company_site: {$eq: companyId}});
    console.log(`Current Subpages: ${subpages}`)
    res.render('business-manage-public-page', {company, subpages});
})

router.get('/:companyId/:subpageId/edit', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    const subpageId = req.params.subpageId;
    const company =  await Company.findById(companyId);
    const subpage = await Subpage.findById(subpageId);
    console.log(company)
    console.log(subpage)
    res.render('subpage-edit', {subpage, company});
})

router.delete('/:companyId/:subpageId/delete', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    const subpageId = req.params.subpageId;
    await Subpage.findByIdAndDelete(subpageId);
    res.redirect(`/business/${companyId}/manage/public-page`);
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


router.get('/:companyId/apply-for-job', ensureAuthenticated, async (req, res) => {
    const applicant = req.user._id;
    const company = req.params.companyId;
    const applicantResumes = await Resume.find({resumeOwner: {$eq: applicant}});

    res.render('apply-for-job', {applicant, company, applicantResumes})
});
router.patch('/:companyId/apply', ensureAuthenticated, async (req, res) => {
    const company = req.params.companyId;
    const resume = req.body.job_applicant;

    const apply = await Company.findByIdAndUpdate(company,
        {$addToSet: {job_applicants: resume}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err) {
                console.log(err)
            } else {
                return
            }
        }
        )
    apply.save();        
    res.redirect(`/business/${company}`)
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
        category: req.body.category,
        supplier_website: req.body.supplier_website,
        product_webpage: req.body.product_webpage,
        total: req.body.total,
        need: req.body.need
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

router.get('/:companyId/inventory/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const companyId = req.params.companyId;
    const company = await Company.findById(companyId);
    const companyInventory = await Item.findById(itemId);
        console.log(`Company Info to Manage: ${company}`)
        res.render('inventory-item', {currentPageTitle: 'Inventory', company, companyInventory})
    ;
});
router.get('/:companyId/add-subpage', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    
    const company = await Company.findById(companyId)
    
    res.render('business-add-subpage', {company})
});

router.get('/:companyId/edit-subpage', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    
    const company = await Company.findById(companyId)
    
    res.render('business-edit-subpage', {company})
});

router.patch('/:companyId/:subpageId/edit', async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const subpageId = req.params.subpageId;
        const updates = req.body;
        const options = {new: true};
        await Subpage.findByIdAndUpdate(subpageId, updates, options);
        
        res.redirect(`/business/${companyId}/manage/public-page`)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:companyId/add-subpage', ensureAuthenticated, (req, res) => {
    const companyId = req.body.companyId;
  
    const subpage = new Subpage({
        company_site: companyId,
        page_name: req.body.page_name,
        page_type: req.body.page_type,
        "page_body.page_header1": req.body.header1,
        "page_body.page_body1": req.body.body1,
        "page_body.page_header2": req.body.header2,
        "page_body.page_body2": req.body.body2,
        "page_body.page_header3": req.body.header3,
        "page_body.page_body3": req.body.body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.main_office_street,
        "page_side.main_office.city": req.body.main_office_city,
        "page_side.main_office.state": req.body.main_office_state,
        "page_side.main_office.country": req.body.main_office_country,
        "page_side.main_office.zip": req.body.main_office_zip,
        "page_side.sub_office.street": req.body.sub_office_street,
        "page_side.sub_office.city": req.body.sub_office_city,
        "page_side.sub_office.state": req.body.sub_office_state,
        "page_side.sub_office.country": req.body.sub_office_country,
        "page_side.sub_office.zip": req.body.sub_office_zip,
    })
    subpage.save()
    res.redirect(`/business/${companyId}/manage`);
});

router.get('/:companyId/add-vr', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    
    const company = await Company.findById(companyId)
    
    res.render('business-add-subpage-vr', {company})
});
router.post('/:companyId/add-vr', ensureAuthenticated, (req, res) => {
    const companyId = req.body.companyId;
    
    const vrSubpage = new Subpage({
        company_site: companyId,
        page_name: req.body.page_name,
        page_type: req.body.page_type,
        "page_body.page_header1": req.body.header1,
        "page_body.page_body1": req.body.body1,
        "page_body.page_header2": req.body.header2,
        "page_body.page_body2": req.body.body2,
        "page_body.page_header3": req.body.header3,
        "page_body.page_body3": req.body.body3,
        "page_side.phone1": req.body.phone1,
        "page_side.phone2": req.body.phone2,
        "page_side.phone3": req.body.phone3,
        "page_side.email1": req.body.email1,
        "page_side.email2": req.body.email2,
        "page_side.email3": req.body.email3,
        "page_side.email4": req.body.email4,
        "page_side.fax1": req.body.fax1,
        "page_side.fax2": req.body.fax2,
        "page_side.main_office.street": req.body.main_office_street,
        "page_side.main_office.city": req.body.main_office_city,
        "page_side.main_office.state": req.body.main_office_state,
        "page_side.main_office.country": req.body.main_office_country,
        "page_side.main_office.zip": req.body.main_office_zip,
        "page_side.sub_office.street": req.body.sub_office_street,
        "page_side.sub_office.city": req.body.sub_office_city,
        "page_side.sub_office.state": req.body.sub_office_state,
        "page_side.sub_office.country": req.body.sub_office_country,
        "page_side.sub_office.zip": req.body.sub_office_zip,
        vr: true
    })
    subpage.save()
    res.redirect(`/business/${companyId}/manage`);
    
})
router.get('/:companyId/edit-subpage', ensureAuthenticated, async (req, res) => {
    const companyId = req.params.companyId;
    
    const company = await Company.findById(companyId)
    const subPages = await Subpage.find({for_company: {$eq: company}})
    res.render('business-edit-subpage', {company, subPages})
});

router.get('/:companyId/:subPage', async (req, res) => {
    const companyId = req.params.companyId;
    const subPage = req.params.subPage;
    const thisCompany = await Company.findById(companyId)
    const thisSubPage = await Subpage.findById(subPage)

    res.render('company-subpage', {thisSubPage, companyId, thisCompany})
});

module.exports = router;