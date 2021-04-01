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
    const universes = await Universe.find();

    res.render('./aether/universe', {universes});
});


router.post('/universe/add', async (req, res) => {
    const universeData = req.body;

    const universe = new Universe({
        name: req.body.name,
        dimensions: {
            x: {
                pos: req.body.dimXpos,
                neg: req.body.dimXneg,
                speed: req.body.dimXspeed
            },
            y: {
                pos: req.body.dimYpos,
                neg: req.body.dimYneg,
                speed: req.body.dimYspeed
            },
            z: {
                pos: req.body.dimZpos,
                neg: req.body.dimZneg,
                speed: req.body.dimZspeed
            },
            time: {
                age: req.body.time
            },
            galaxies: []
        }
    });
    universe.save();
    res.redirect('/aether/universe')
});

router.get('/universe/:universeId', async (req, res) => {
    const universeId = req.params.universeId;
    const universe = await Universe.findById(universeId).populate('galaxies').exec();
    res.render('./aether/universe-home', {universe})
})
router.post('/universe/:universeId/galaxy/add', async (req, res) => {
    const universeId = req.params.universeId;

    const galaxy = new Galaxy({
        name: req.body.name,
        dimensions: {
            x: {
                pos: req.body.dimXpos,
                neg: req.body.dimXneg,
                speed: req.body.dimXspeed
            },
            y: {
                pos: req.body.dimYpos,
                neg: req.body.dimYneg,
                speed: req.body.dimYspeed
            },
            z: {
                pos: req.body.dimZpos,
                neg: req.body.dimZneg,
                speed: req.body.dimZspeed
            },
            position: {
                x: req.body.posX,
                y: req.body.posY,
                z: req.body.posZ
            },
            rotation: {
                x: req.body.rotX,
                y: req.body.rotY,
                z: req.body.rotZ
            },
            time: {
                age: req.body.time
            },
            solar_systems: []
        }
    });
    galaxy.save();

    await Universe.findByIdAndUpdate(universeId, ({
        $addToSet: {galaxies: galaxy}
    }))
    res.redirect(`/aether/universe/${universeId}`)
});

module.exports = router;