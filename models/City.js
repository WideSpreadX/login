const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const citySchema = new mongoose.Schema({
    name: String,
    sector: { type: mongoose.Schema.Types.ObjectId, ref: 'Sector'},
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ws_city_data: {
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
    zones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CityZone'}]
});

const City = mongoose.model('City', citySchema);

module.exports = City;