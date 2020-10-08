const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
})
// Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

// Register Handle
router.post('/register', (req, res) => {
    const {fname, lname, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!fname || !lname || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'})
    }
    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'})
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            fname,
            lname,
            email,
            password,
            password2
        });
    } else {
        // Validation Pass
        User.findOne({ email: email })
        .then(user => {
            if (user) {
                // User Exists
                errors.push({ msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    fname,
                    lname,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    fname,
                    lname,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    // Set password to hashed
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));

                }))
            }
        })
        .catch();
    }
})


// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});

// User Profile Page
/* 
router.get('/:userId', (req, res, next) => {
    const users = req.app.locals.user;
    const userId = req.params._id;

    users.findOne({ userId }, (err, results) => {
        if (err || !results) {
            res.render('user-not-found');
        }
        res.render('public-profile', {...results, userId, name: req.user.name, email: req.user.email});
    });
});

 */
router.get('/:id', ensureAuthenticated, async (req, res) => {
    const id = req.params.id
    const userId = req.user._id;
    console.log("User ID: " + userId);

   const posts = await Post.find({ author: { $eq: id } }).sort({createdAt: 'desc'});
    User.findById(id)
    .populate('friends')
    .exec()
    .then(profile => {
            res.render('public-profile', {profile, posts})
            console.log(profile);
        });
})

/* router.post('/:id/add-friend', ensureAuthenticated, (req, res) => {
    let thisFriend = req.params.id
    let currentUser = req.user.friends; 
    let thisFriend = req.params.id
     let currentUser = req.user.friends; 
        User.find({
            _id: {$nin: user.friends}
        }, function(err, friends) {
            res.render('dashboard', {friends}); 
            
        }) 
           
        console.log("User to Add: " + thisFriend + "  -  Current User: " + currentUser);
          User.findById(req.user.id, function() {

            thisFriend.push(req.user.friends)
            thisFriend.save(function(err) {
                res.redirect('/dashboard');
            })
        }) 
    }) 
        console.log("THIS USER " + thisFriend);


            User.findById(req.user.id)
                thisFriend.push(req.user.friends)
                .save()


});
    
    
     .catch(err => console.log(err)); */


  router.post('/:id/add-friend', (req, res) => {
    let id = req.body.friends;
    let userId = req.user._id;
    console.log("req.body: " + id);
    User.findOne({'_id': req.body.friends}, '_id', (err, newFriend) => {
        console.log("newFriend ID - Step 1: " + newFriend._id);
        console.log("currentUser ID - Step 2: " + userId);
        if (err) {
            return
        } else {
/*             let newFriendId = newFriend._id;
            User.findByIdAndUpdate(req.user._id, newFriend._id, (err, userId))
            userId.friends.push(newFriendId);
            userId.save(); */
            User.findByIdAndUpdate(userId,
                {$push: {friends: req.body.friends}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                    console.log(err);
                    }else{
                    
                        return
                    }
                }
                )
                
            }
    })
    .then(
        res.redirect('/dashboard')
    )

});

router.get('/:id/update-profile', ensureAuthenticated, (req, res, next) => {
    const id = req.user._id

    res.render('update-profile', {id: id});
});
router.post('/:id/update-profile', ensureAuthenticated, (req, res, next) => {
    const id = req.params._id;
    const userId = req.user._id
/*     let data = {
        about: req.body.about,
        town: req.body.town,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        social: {
            github: req.body.github,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            pinterest: req.body.pinterest
        }
    }; */
    User.findByIdAndUpdate(userId,
        {data: req.body},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            
                return
            }
        }
        )
    res.redirect('/dashboard');
});


router.post('/:id/post', (req, res) => {
    const userId = req.user._id;
    const post = new Post({
        _id: req.body._id,
        postBody: req.body.postBody,
        createdAt: req.body.createdAt,
        author: userId
    })
    post.save()
    res.redirect('/dashboard')

});


// Seeing Posts

router.get('/posts/:postId', ensureAuthenticated, async (req, res) => {
      const postId = req.params.postId;

        
      const thisPost = await Post.findById(postId)
      console.log("Post ID: " + postId);
      console.log("postId Data: " + thisPost.author);

    const userPost =
    {
        id: req.params.postId,
        author: req.body.author,
        postBody: req.body.postBody,
        createdAt: req.body.createdAt,
        comments: req.body.comments
    }

    const postAuthor = await User.findById(thisPost.author)
        console.log("POST AUTHOR: " + postAuthor.fname)
        
        res.render('full-post', {thisPost, postAuthor})
})

// Deleting Posts - ONLY FOR DASHBOARD
router.get('/post/:postId', (req, res) => {
    const post = {
        id: req.params.postId,
        postBody: req.params.postBody
    }
    const id = req.user.id;
    res.render('delete-post', {post, id})
})
router.delete('/post/:postId', async (req, res) => {
    const post = req.params.postId;

    await Post.findByIdAndDelete(post);
    res.redirect('/dashboard')

});



module.exports = router;