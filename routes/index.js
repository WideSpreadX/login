const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard
    router.get('/dashboard', ensureAuthenticated, (req, res) => {
        const id = req.user._id;
        
        User.findById(id)
        .populate('friends')
        .exec()
        .then(profile => {
                res.render('dashboard', {profile,
                fname: req.user.fname,
                id: req.user.id
                })
                console.log(profile);
            }); 
         /*    {
        } 
        );
       */
    });


module.exports = router;