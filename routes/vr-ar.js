const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Resume = require('../models/Resume');
const Article = require('../models/Article');
const ProfileImage = require('../models/ProfileImage');
const PhotoAlbum = require('../models/PhotoAlbum');
const Avatar = require('../models/Avatar');
const Video = require('../models/Video');


// Welcome Page
router.get('/vr-dashboard', async (req, res) => {
    const user = req.user.id;
    const thisUser = await User.findById(user);
    console.log(thisUser)
    res.render('./vr-ar/vr-dashboard', {layout: './layouts/vr-ar', thisUser});
});


module.exports = router;