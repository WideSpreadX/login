const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Company = require('../models/Company');
const Universe = require('../models/Universe');
const Galaxy = require('../models/Galaxy');
/* const SolarSystem = require('../models/SolarSystem');
const Planet = require('../models/Planet');
const Sector = require('../models/Sector');
const City = require('../models/City');
const Place = require('../models/Place');
 */
router.get('/', async (req, res) => {
    res.render('./aether/main');
});

router.get('/universe', async (req, res) => {
    res.render('./aether/universe');
});


router.post('/universe/add', async (req, res) => {

});

module.exports = router;