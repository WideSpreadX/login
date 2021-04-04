const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const solarSystemSchema = new mongoose.Schema({
    name: String,
    galaxy: { type: mongoose.Schema.Types.ObjectId, ref: 'Galaxy'},
    dimensions: {
        x: {
          pos:  Number,
          neg:  Number,
          speed:  Number,
        },
        y: {
          pos:  Number,
          neg:  Number,
          speed:  Number,
        },
        z: {
          pos:  Number,
          neg:  Number,
          speed:  Number,
        },
        time: {
            age: Number,
/*             sliver: [{
                type: ObjectId,
                ref: 'TimeSliver'
            }] */
        }
    },
    position: {
        x: Number,
        y: Number,
        z: Number
    },
    rotation: {
        x: Number,
        y: Number,
        z: Number
    },
    star: {
        name: String,
        age: Number,
        location: {
            x: Number,
            y: Number,
            z: Number
        },
        dimensions: {
            x: Number,
            y: Number,
            z: Number
        },
        single_rotation_time: {
            x: Number,
            y: Number,
            z: Number
        },

    },
    planets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet'}]
});

const SolarSystem = mongoose.model('SolarSystem', solarSystemSchema);

module.exports = SolarSystem;