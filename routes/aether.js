const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Company = require('../models/Company');
const Universe = require('../models/Universe');
const Galaxy = require('../models/Galaxy');
const SolarSystem = require('../models/SolarSystem');
const Planet = require('../models/Planet');
const Sector = require('../models/Sector');
const City = require('../models/City');
const Place = require('../models/Place');
const CityZone = require('../models/CityZone');
/* 
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


router.get('/universe/:universeId/galaxy/:galaxyId', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;

    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.find();

    res.render('./aether/galaxy-home', {universe, galaxy, solarSystem})
});

router.post('/universe/:universeId/galaxy/:galaxyId/solar-system/add', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;

    const solarSystem = new SolarSystem({
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
    solarSystem.save();

    await Galaxy.findByIdAndUpdate(galaxyId, ({
        $addToSet: {solar_systems: solarSystem}
    }))
    res.redirect(`/aether/universe/${universeId}/galaxy/${galaxyId}`)
});

router.get('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;

    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.findById(solarSystemId);
    const planets = await Planet.find();

    res.render('./aether/planet-home', {universe, galaxy, solarSystem, planets})
});

router.post('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/add', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;

    const planet = new Planet({
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
    planet.save();

    await SolarSystem.findByIdAndUpdate(solarSystemId, ({
        $addToSet: {planets: planet}
    }))
    res.redirect(`/aether/universe/${universeId}/galaxy/${galaxyId}/solar-system/${solarSystemId}`)
});



router.get('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectors = await Sector.find();
    
    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.findById(solarSystemId);
    const planet = await Planet.findById(planetId);

    res.render('./aether/planet-single', {universe, galaxy, solarSystem, planet, sectors})
});


/* Add Sector to Planet */
router.post('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/add', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;

    const sector = new Sector({
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
            cities: [],
            maps: [],
            leader: req.body.leader
        }
    });
    sector.save();

    await Planet.findByIdAndUpdate(planetId, ({
        $addToSet: {sectors: sector}
    }))
    res.redirect(`/aether/universe/${universeId}/galaxy/${galaxyId}/solar-system/${solarSystemId}/planet/${planetId}`)
});



router.get('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/:sectorId', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectorId = req.params.sectorId;
    const sector = await Sector.findById(sectorId);
    const cities = await City.find();
    const cityZones = await CityZone.find();
    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.findById(solarSystemId);
    const planet = await Planet.findById(planetId);
    res.render('./aether/sector-single', {universe, galaxy, solarSystem, planet, sector, cities, cityZones})
});






/* Add City to Sector */
router.post('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/:sectorId/city/add', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectorId = req.params.sectorId;

    const city = new City({
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
            place_type: req.body.place_type,
            units: [],
            history: [],
            leader: req.body.leader
        }
    });
    city.save();

    await Sector.findByIdAndUpdate(sectorId, ({
        $addToSet: {cities: city}
    }))
    res.redirect(`/aether/universe/${universeId}/galaxy/${galaxyId}/solar-system/${solarSystemId}/planet/${planetId}/sector/${sectorId}`)
});



router.get('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/:sectorId/city/:cityId', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectorId = req.params.sectorId;
    const cityId = req.params.cityId;
    const sector = await Sector.findById(sectorId);
    const city = await City.findById(cityId);
    const cityZones = await CityZone.find();
    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.findById(solarSystemId);
    const planet = await Planet.findById(planetId);
    const places = await Place.find();
    res.render('./aether/city-single', {universe, galaxy, solarSystem, planet, sector, city, cityZones, places})
});



/* All Places */

router.get('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/:sectorId/city/:cityId/place', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectorId = req.params.sectorId;
    const cityId = req.params.cityId;
    const sector = await Sector.findById(sectorId);
    const city = await City.findById(cityId);
    const cityZones = await CityZone.find();
    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.findById(solarSystemId);
    const planet = await Planet.findById(planetId);
    const places = await Place.find();
    res.render('./aether/place-home', {universe, galaxy, solarSystem, planet, sector, city, cityZones, places})
});





router.get('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/:sectorId/city/:cityId/place/:placeId', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectorId = req.params.sectorId;
    const cityId = req.params.cityId;
    const placeId = req.params.placeId;
    const sector = await Sector.findById(sectorId);
    const city = await City.findById(cityId);
    const cityZones = await CityZone.find();
    const universe = await Universe.findById(universeId);
    const galaxy = await Galaxy.findById(galaxyId);
    const solarSystem = await SolarSystem.findById(solarSystemId);
    const planet = await Planet.findById(planetId);
    const place = await Place.findById(placeId);
    res.render('./aether/place-single', {universe, galaxy, solarSystem, planet, sector, city, cityZones, place})
});




/* Add Place to City */
router.post('/universe/:universeId/galaxy/:galaxyId/solar-system/:solarSystemId/planet/:planetId/sector/:sectorId/city/:cityId/place/add', async (req, res) => {
    const universeId = req.params.universeId;
    const galaxyId = req.params.galaxyId;
    const solarSystemId = req.params.solarSystemId;
    const planetId = req.params.planetId;
    const sectorId = req.params.sectorId;
    const cityId = req.params.cityId;

    const place = new Place({
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
            gps: {
                x: req.body.gpsX,
                y: req.body.gpsY
            },
            mailing: {
                address: req.body.address,
                floor: req.body.floor,
                unit: req.body.unit
            },
            place_type: req.body.placeType,
            history: [],
            owner: req.body.owner
        }
    });
    place.save();

    await City.findByIdAndUpdate(cityId, ({
        $addToSet: {places: place}
    }))
    res.redirect(`/aether/universe/${universeId}/galaxy/${galaxyId}/solar-system/${solarSystemId}/planet/${planetId}/sector/${sectorId}/city/${cityId}`)
});




module.exports = router;