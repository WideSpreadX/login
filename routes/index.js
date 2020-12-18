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
const Avatar = require('../models/Avatar');


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
        const avatarImage = await Avatar.findOne({ imageOwner: { $eq: id } });
        

/*         console.log("Users Resume: " + resume)
        console.log("Users Posts: " + posts)
        console.log("Users Posts: " + profileImages) */

        User.findById(id)
        .populate('friends')
        .populate('posts')
        .populate('user_images')
        .exec()
        .then(profile => {
                res.render('dashboard', {
                profile,
                profileImages,
                avatarImage,
                fname: req.user.fname,
                id: req.user.id,
                posts,
                resume,
                article,
                currentPageTitle: 'Dashboard'
                })
                /* console.log(`User Info: ${profile}`) */
                console.log(`User Friends ---------------- ${profile.friends}`)
                /* console.log(`User Images: ${profileImages}`) */

            });
            
    });

    router.get('/dashboard/wall', ensureAuthenticated, async (req, res) => {
      const id = req.user._id;
      /* console.log( `User Friends List Array +++++++++ ${req.user.friends}`) */
      const posts = await Post.find({ author: { $eq: id } }).sort({createdAt: 'desc'}).populate('comments');
      const resume = await Resume.find({ resumeOwner: { $eq: id } });
      const article = await Article.find({ author: { $eq: id } });
      const profileImages = await ProfileImage.find({ imageOwner: { $eq: id } });
      const findUserAvatar = await profileImages[0]._id;
      const userAvatar = await ProfileImage.find({ _id: { $eq: findUserAvatar } });
      console.log(`User Avatar -------------- ${findUserAvatar}`);
      
      
      /* const allFriendsPosts = await Post.find({author: {$eq: friendId}}).sort({createdAt: 'desc'}); */
      
      let extractedFriend = {};
      const getFriendId = await User.findById(id);
      const friendIds = req.user.friends;
      const friendsData = await User.find({_id: friendIds});
      console.log( `Friend +++++++++ ${friendsData}`)
      let friendIdArray = Array.from(friendsData)
      
      /*       console.log( `ALL POSTS *************** ${allPosts}`)   */
      /* console.log(`Comments: ${allPosts}`) */
      /* console.log(`Comments: ${allPosts}`) */
      const comments = await Comment.find({fromPost: {$eq: posts._id} })
      const allPosts = Post.find({ "author": { "$in": friendIds } }).populate('author', 'comments')
      .exec(function (err, data){
        if(err){
          return console.log(err);
        } else {
          return res.render('dashboard-wall', {
            currentPageTitle: 'YourSpread',
            data,
            friendsData,
            allPosts,
            comments,
            userAvatar
          })
        }
      }); 


          
  });

module.exports = router;