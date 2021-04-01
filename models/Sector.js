const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const sectorSchema = new mongoose.Schema({
    name: String,
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
            time_zone: String,
        }
    },
    position: {
        x: Number,
        y: Number,
        z: Number
    },
    cities: [{
        type: ObjectId,
        ref: 'City'
    }],
    maps: [{
        name: String,
        image: String,
        geo_points: [{
            x: String,
            y: String,
            z: String
        }]
    }],
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Sector = mongoose.model('Sector', sectorSchema);

module.exports = Sector;