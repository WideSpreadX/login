const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({
    name: String,
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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
    gps: {
        x: String,
        y: String
    },
    mailing: {
        address: String,
        floor: Number,
        unit: Number
    },
    place_type: String,
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place'}],
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit'}]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;