const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Post = require('../models/Post');
const Resume = require('../models/Resume');
const Article = require('../models/Article');


// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard
    router.get('/dashboard', ensureAuthenticated, async (req, res) => {
        const id = req.user._id;
       
        const posts = await Post.find({ author: { $eq: id } }).sort({createdAt: 'desc'});
        const resume = await Resume.find({ resumeOwner: { $eq: id } });
        const article = await Article.find({ author: { $eq: id } });


        console.log("Users Resume: " + resume)
        console.log("Users Posts: " + posts)
        User.findById(id)
        .populate('friends')
        .exec()
        .then(profile => {
                res.render('dashboard', {
                profile,
                fname: req.user.fname,
                id: req.user.id,
                posts,
                resume,
                article,
                currentPageTitle: 'Dashboard'
                })
            }); 
    });


module.exports = router;