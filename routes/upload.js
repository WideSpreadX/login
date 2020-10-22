const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

router.post('/', upload.single('user_image'), ensureAuthenticated, (req, res) => {
    res.json({file: req.file})
})

module.exports = router;