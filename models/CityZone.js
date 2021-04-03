const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const cityZoneSchema = new mongoose.Schema({
    name: String,
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ws_zone_data: {
        ws_id: String,
        ws_zone: Number
    },
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
        }
    },
    position: {
        x: Number,
        y: Number,
        z: Number
    },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place'}]
});

const CityZone = mongoose.model('CityZone', cityZoneSchema);

module.exports = CityZone;