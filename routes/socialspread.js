const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated } = require('../config/auth');


const User = require('../models/User');
const Post = require('../models/Post');



router.get('/:id', ensureAuthenticated, (req, res) => {

    const id = req.user._id;
    const friends = req.user.friends;
    res.render('socialspread-home', {currentPageTitle: 'SocialSpread'})
});



module.exports = router;