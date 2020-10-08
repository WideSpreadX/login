const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Post = require('../models/Post');
// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard
    router.get('/dashboard', ensureAuthenticated, async (req, res) => {
        const id = req.user._id;
        /* const posts = Post.find({author: id}).populate('Post'); */
        const posts = await Post.find({ author: { $eq: id } }).sort({createdAt: 'desc'});

/* posts.map(post => post.postBody).sort(); */
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
                currentPageTitle: 'Dashboard'
                })
                console.log(profile);
                console.log(posts);
            }); 
         /*    {
        } 
        );
       */
    });


module.exports = router;