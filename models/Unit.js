const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const unitSchema = new mongoose.Schema({
    name: String,
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
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
        y: String,
        z: String
    },
    mailing: {
        address: String,
        floor: Number,
        unit: Number
    },
    unit_type: String,
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit'}]
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;