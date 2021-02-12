const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');


router.get('/', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const userInfo = await User.findById(user)
    .populate({
        path: 'saved_posts',
        model: 'Post',
        populate: {
            path: 'author',
            model: 'User'
        }
    })
    .populate({
        path: 'saved_articles',
        model: 'Article',
        populate: {
            path: 'author',
            model: 'User'
        }
    })
    .exec()
    const savedPosts = await Post.find({postAuthor: {$eq: user}});
    res.render('yourspread-home', {userInfo, savedPosts})
})
module.exports = router;