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
const Resume = require('../models/Resume');
const Article = require('../models/Article');
const ProfileImage = require('../models/ProfileImage');


// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

const db = require('../config/keys').MongoURI;
const conn = mongoose.createConnection(db)
let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  })
  
  //Create storage object
  const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            metadata: {
              imageOwner: req.user._id
            },
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  }); 
  
  const upload = multer({ storage });
// Dashboard
    router.get('/dashboard', ensureAuthenticated, async (req, res) => {
        const id = req.user._id;

        const posts = await Post.find({ author: { $eq: id } }).sort({createdAt: 'desc'});
        const resume = await Resume.find({ resumeOwner: { $eq: id } });
        const article = await Article.find({ author: { $eq: id } });
        const profileImages = await ProfileImage.find({ imageOwner: { $eq: id } });
        

        console.log("Users Resume: " + resume)
        console.log("Users Posts: " + posts)
        console.log("Users Posts: " + profileImages)

        User.findById(id)
        .populate('friends')
        .populate('posts')
        .populate('user_images')
        .exec()
        .then(profile => {
                res.render('dashboard', {
                profile,
                profileImages,
                fname: req.user.fname,
                id: req.user.id,
                posts,
                resume,
                article,
                currentPageTitle: 'Dashboard'
                })
                console.log(`User Info: ${profile}`)
                console.log(`User Friends: ${profile.friends}`)
                console.log(`User Images: ${profileImages}`)

            });
            
    });


module.exports = router;