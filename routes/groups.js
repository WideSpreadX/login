const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Group = require('../models/Group');

router.get('/', async (req, res) => {
    const allGroups = await Group.find();
    res.render('group-main', {allGroups});
});


router.post('/new', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const group = new Group({
        creator: user,
        group_name: req.body.name,
        description: req.body.description,
        focus: req.body.group_focus,
        "colors.main": req.body.main_color,
        "colors.accent": req.body.accent_color,
        public: req.body.public,
        "fees.free": req.body.fees,
        "fees.price": req.body.fee_cost,
        "fees.frequency": req.body.fee_frequency,
    })
    group.save()

    res.redirect('/groups');
});

router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId).populate('members').exec()
    const members = await Group.findById(groupId).populate('members').exec()

    res.render('group-single', {group, members});
});

router.patch('/:groupId/join', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const groupId = req.params.groupId;
    const newMember = await Group.findByIdAndUpdate(groupId,
            {$addToSet: {members: user}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err) {
                    console.log(err)
                } else {
                    return
                }
            }
        )
        newMember.save()
        res.redirect(`/groups/${groupId}`);
});

router.get('/:groupId/upload-image', ensureAuthenticated, async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);
    res.render('group-upload-image', {group});
});
module.exports = router;