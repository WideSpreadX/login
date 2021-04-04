const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const planetSchema = new mongoose.Schema({
    name: String,
    solar_system: { type: mongoose.Schema.Types.ObjectId, ref: 'SolarSystem'},
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
        z: Number,
        single_rotation_time: {
            x: Number,
            y: Number,
            z: Number
        }
    },
    orbital_period: {
        day_length: Number,
        
    },
    sectors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sector'}]
});

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;