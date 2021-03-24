const express = require('express');
const router = express.Router();


const {ensureAuthenticated } = require('../config/auth');

// Models
const User = require('../models/User');
const Admin = require('../models/Admin');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Resume = require('../models/Resume');
const Company = require('../models/Company');
const Article = require('../models/Article');
const ProfileImage = require('../models/ProfileImage');
const CommentImage = require('../models/CommentImage');
const Avatar = require('../models/Avatar');
const InSpread = require('../models/InSpread');
const Poll = require('../models/Poll');
const Course = require('../models/Course');
const Item = require('../models/Item');
const UserBackgroundImage = require('../models/UserBackgroundImage');


router.get('/', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const thisUser = await User.findById(user);
    const adminUser = await User.findById(user).select('admin').populate('admin_id').exec();
    const adminUsers = await Admin.find().populate('admin_id').exec();
    res.render('admin', {thisUser, adminUser, adminUsers});
});


router.post('/add-new', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const newAdmin = new Admin({
        admin_id: req.body.userId,
        admin_type: req.body.admin_type,
        security_clearance: req.body.security_clearance,
        admin_link: req.body.admin_link
    })
    newAdmin.save()
    res.redirect('/admin')

});

router.get('/users/:userId', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const adminId = await Admin.findOne({admin_id: {$eq: user}}).select('admin_id');
    const adminUser = await Admin.findOne({admin_id: {$eq: user}}).populate('admin_id').exec();
    const businessOwner = await Company.find({companyOwner: {$eq: user}});
    const courseCreator = await Course.find({courseCreator: {$eq: user}});

    res.render('admin-user', {user, adminId, adminUser, businessOwner, courseCreator})
});

router.get('/users/:userId/:businessId', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const businessId = req.params.businessId;
    const adminUser = await Admin.findOne({admin_id: {$eq: userId}}).populate('admin_id').exec();
    const business = await Company.findById(businessId).populate({
        path: 'employees',
        model: 'User'
    }).exec()
    const inventory = await Item.find({for_company: {$eq: businessId}})

    res.render('admin-business', {adminUser, business, inventory});
});
module.exports = router;