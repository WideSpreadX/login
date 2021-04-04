const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const galaxySchema = new mongoose.Schema({
    name: String,
    universe: { type: mongoose.Schema.Types.ObjectId, ref: 'Universe'},
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
    solar_systems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SolarSystem'}],
    image: String,
});

const Galaxy = mongoose.model('Galaxy', galaxySchema);

module.exports = Galaxy;