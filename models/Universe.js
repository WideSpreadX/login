const { ObjectId } = require('bson');
const mongoose = require('mongoose');


const universeSchema = new mongoose.Schema({
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
        }
    },
    galaxies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Galaxy'}]
});

const Universe = mongoose.model('Universe', universeSchema);

module.exports = Universe;