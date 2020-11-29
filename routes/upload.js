const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/', upload.single('user_image'), ensureAuthenticated, (req, res) => {
    const imageOwner = req.user._id;

    User.findByIdAndUpdate(imageOwner,
            {$push: {user_images: req.file.id}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    return
                }
            }
        )
    console.log(`Image Owner: ${imageOwner} Image Data: ${req.file}`);
    res.json({file: req.file})
})

module.exports = router;