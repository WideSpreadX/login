const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');


const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Resume = require('../models/Resume');
const Article = require('../models/Article');
const ProfileImage = require('../models/ProfileImage');
const PhotoAlbum = require('../models/PhotoAlbum');
const Video = require('../models/Video');


// Welcome Page
router.get('/vr-dashboard', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;
    const thisUser = await User.findById(user).populate('friends').populate('posts').exec();
    const userFriends = await User.findById(user).populate('friends').exec()
    res.render('./vr-ar/vr-dashboard', {layout: './layouts/vr-ar', thisUser, userFriends});
});

router.get('/:user', async (req, res) => {
    const user = req.params.user;
    const thisUser = await User.findById(user).populate('friends').exec()

    res.render('./vr-ar/vr-public-profile', {layout: './layouts/vr-ar', thisUser});
});

module.exports = router;