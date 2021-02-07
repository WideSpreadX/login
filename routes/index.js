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
const Audio = require('../models/Audio');
const InSpread = require('../models/InSpread');


// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

const db = require('../config/keys').MongoURI;
const UserBackgroundImage = require('../models/UserBackgroundImage');
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
        const friends = req.user.friends;
        const posts = await Post.find({ author: { $eq: id } }).sort({createdAt: 'desc'});
        const resume = await Resume.find({ resumeOwner: { $eq: id } });
        const article = await Article.find({ author: { $eq: id } });
        const videos = await Video.find({videoOwner: {$eq: id }});
        const audioTracks = await Audio.find({audioOwner: {$eq: id }});
        const profileImages = await ProfileImage.find({ imageOwner: { $eq: id } });
        const avatarImage = await Avatar.findOne({ imageOwner: { $eq: id } });
        const nearbyUsers = await User.find();
        const inSpreads = await InSpread.find({inSpreadTo: {$eq: id}}).populate('inSpreadFrom').exec();
        const backgroundImage = await UserBackgroundImage.findOne({ imageOwner: { $eq: id } });
      const allAvatars = await ProfileImage.find({friends: {$elemMatch: {_id: friends}}})

        /* console.log(`All Avatars: ${allAvatars}`) */
        const getAvatars = await User.find()
        console.log("Dashboard Page")

/*         console.log("Users Resume: " + resume)
        console.log("Users Posts: " + posts)
        console.log("Users Posts: " + profileImages) */

        console.log(`Friend ID's ${friends}`)
        friends.forEach(friendId);
        function friendId(value) {
          console.log(value)
          nearbyUsers.forEach(getId)
          function getId(id) {
            console.log(id.id)
          if (value == id.id) {
            console.log(`This user is your friend ${value} - ${id.id}`)
            }
            
          }
        }
        

        User.findById(id)
        .populate({
          path: 'friends',
          model: 'User'
        })
        .populate('user_audio')
        .populate('posts')
        .then(profile => {
                res.render('dashboard', {
                profile,
                profileImages,
                avatarImage,
                backgroundImage,
                getAvatars,
                allAvatars,
                fname: req.user.fname,
                id: req.user.id,
                posts,
                videos,
                audioTracks,
                resume,
                article,
                nearbyUsers,
                inSpreads,
                currentPageTitle: 'Dashboard'
                })
                console.log(`User Info: ${backgroundImage}`)
               /*  console.log(`User Friends ---------------- ${profile.friends}`) */
                /* console.log(`User Images: ${profileImages}`) */

            });
            
    });

    router.get('/dashboard/wall', ensureAuthenticated, async (req, res) => {
      const id = req.user._id;
      const resume = await Resume.find({ resumeOwner: { $eq: id } });
      const article = await Article.find({ author: { $eq: id } });
      
      /* const findUserAvatar = await profileImages[0]._id; */
      
      /* const userAvatar = await ProfileImage.find({ _id: { $eq: findUserAvatar } }); */
      const friendIds = req.user.friends;
      const posts = await Post.find({ "author": { "$in": friendIds } }).sort({createdAt: 'desc'}).populate('comments');
      
      let checkAuthor = []
      const postAuthor = () => {
        for (i = 0; i < posts.length; i++) {
          posts[i].author.push(checkAuthor)
          /* ProfileImage.findOne({imageOwner: {$eq: checkAuthor}}) */
        }}
        
        const postAvatars = await Post.find({ "author": { "$in": friendIds } })
        /* console.log(`Post Author: ${postAvatars}`) */
        const profileImages = await ProfileImage.find({ imageOwner: { "$in": friendIds } });
        const avatarImage = await ProfileImage.find({ imageOwner: { "$in": friendIds } });
/*         console.log(`Profile Images: ${profileImages}`)
        console.log(`All Posts: ${posts}`) */
        
        /*         console.log(`Avatar Images: ${avatarImage}`)
        console.log(`Avatar Image ID's: ${avatarImage}`) */
        
        
      const comments = await Comment.find({fromPost: {$eq: posts._id} })
      const allPosts = await Post.find({ "author": { "$in": friendIds } })
      .sort({createdAt: 'desc'})
      .populate({
        path: 'author',
        model: 'User'
      }) 
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
      .exec(function (err, data){
        console.log(`Dashboard Wall Page Loaded...`)
        if(err){
          return console.log(err);
        } else {
          /* console.log(`id: ${id} === post.author._id ${postAuthor(posts)}`) */
          return res.render('dashboard-wall', {
            currentPageTitle: 'YourSpread',
            data,
            allPosts,
            comments,
            profileImages,
            avatarImage,
            id,
            checkAuthor,
            
          })
        }
      }); 


          
  });

  /* Like Button */
  /* Post Like */
  router.patch('/dashboard/wall/post/:postId/like', ensureAuthenticated, (req, res) => {
    const userId = req.user.id
    const postId = req.params.postId;
    Post.findByIdAndUpdate({_id: postId}, {$inc: {'likes': 1}})
    .exec(
        User.findByIdAndUpdate(userId, 
          {$push: {likedPosts: postId}},
          {safe: true, upsert: true},
          function(err, doc) {
            if(err) {
              console.log(err)
            } else {
              return
            }
          })
    )
    .then(
      res.redirect('/dashboard/wall')
    )
  })
router.get('/:userId/friends', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId;

    const friendList = await User.findById(userId).populate({
      path: 'friends',
      model: 'User'
    }).exec()
    console.log(friendList);
    
    res.render('friends-page', {friendList, userId})

});


/* Comment Like */
  router.patch('/:commentId/like', ensureAuthenticated, (req, res) => {
    const userId = req.user.id
    const commentId = req.params.commentId;
    Comment.findByIdAndUpdate({_id: commentId}, {$inc: {'likes': 1}})
    .exec(
        User.findByIdAndUpdate(userId, 
          {$push: {likedComments: commentId}},
          {safe: true, upsert: true},
          function(err, doc) {
            if(err) {
              console.log(err)
            } else {
              return
            }
          })
    )
    .then(
      res.redirect('/dashboard/wall')
    )
  })


  router.get('/dashboard/wall/:postId/comment', ensureAuthenticated, async (req, res) => {
    const postId = req.params.postId;
    const newPostAuthor = req.user._id;
    const friendIds = req.user.friends;
    const friendsData = await User.find({_id: friendIds});
    const post = await Post.findById(postId)
    const comments = await Comment.find({fromPost: {$eq: postId._id} }).populate('author')
    .populate({
      path: 'author',
      model: 'User'
    })
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'author',
        model: 'User'
      }
    })
    
    .exec(function (err, data){
      console.log(`Data: ${data}`)
      if(err){
        return console.log(err);
      } else {
        return res.render('dashboard-wall-post', {
          currentPageTitle: 'YourSpread',
          data,
          friendsData,
          post,
          comments,
          newPostAuthor
        })
      }
    }); 

  });

  router.get('/photo-album/:user', ensureAuthenticated, async (req, res) => {
    const user = req.params.user;
    const thisUser = await User.findById(user);
    const photoAlbums = await PhotoAlbum.find({albumnOwner: {$eq: user._id}});
    console.log(photoAlbums)
    res.render('photo-album', {photoAlbums, thisUser})
  })

  router.get('/photo-album/:user/:albumId', ensureAuthenticated, async (req, res) => {
    const user = req.params.user;
    const albumId = req.params.albumId;
    const thisUser = await User.findById(user);
    const photoAlbums = await PhotoAlbum.findById(albumId);
    console.log(photoAlbums)
    res.render('album', {photoAlbums, thisUser, albumId})
  })
  router.post('/photo-album', ensureAuthenticated, (req, res) => {
    const user = req.user.id;
    const photoAlbum = new PhotoAlbum({
      albumOwner: req.user._id,
      album_name: req.body.album_name,
      album_description: req.body.album_description,
      album_color: req.body.album_color,
      private: req.body.private,
    });
    photoAlbum.save()

    res.redirect(`/photo-album/${user}`);
  })
  router.get('/socialspread', async (req, res) => {
    const thisUser = req.user._id;
    
    const userFriends = await User.findById(thisUser).populate('friends').exec()
    const friendId = userFriends.friends.map(friend);
    function friend(id) {
      return id._id
    }
    
    let friendIds = []
    friendIds.push(friendId.toString())
    console.log(friendIds)
    /*    const avatars =  Avatar.find({imageOwner: {$eq: friends._id}}) */
    const avatars = friendIds.forEach(findAvatar)
    
    
    function findAvatar(friendId) {
      const friendAvatar = ProfileImage.findOne({imageOwner: {$eq: friendId }})
      console.log(friendAvatar)  
    }
    
    User.findById(thisUser)
        .populate({
          path: 'friends',
          model: 'User',
          populate: {
            path: 'friends',
            model: 'User'
          } 
        })
        .exec()
        .then(profile => 
          res.render('socialspread-home', {currentPageTitle: 'SocialSpread', profile, userFriends, friendIds, avatars})
        )
  })
module.exports = router;