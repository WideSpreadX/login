const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const userInfo = await User.findById(user)
    res.render('yourspread-home', {userInfo})
})
module.exports = router;