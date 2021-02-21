const express = require('express');
const router = express.Router();
const User = require('../models/User');
const SpreadRoom = require('../models/SpreadRoom');
const {ensureAuthenticated } = require('../config/auth');


router.get('/', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('friends').exec()
    res.render('spreadchat-home', {user})
});

/* Video Chat */
router.get('/video', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const spreadrooms = await SpreadRoom.find({room_owner: {$eq: userId}})
    const user = await User.findById(userId).populate('friends').exec()
    res.render('spreadchat-video', {user, spreadrooms})
});

router.post('/video/create-spreadroom', ensureAuthenticated, async (req, res) => {
    const spreadroom = new SpreadRoom({
        room_owner: req.body.room_owner,
        room_name: req.body.room_name,
        room_description: req.body.room_description,
        room_color: req.body.room_color,
    })    
    spreadroom.save()
    res.redirect('/spreadchat/video');
});

router.get('/video/:spreadroomId', ensureAuthenticated, async (req, res) => {
    const spreadroomId = req.params.spreadroomId;
    const spreadroom = await SpreadRoom.findById(spreadroomId);

    res.render('spreadroom', {spreadroom});
})
module.exports = router;