const mongoose = require('mongoose');

const InSpreadSchema = new mongoose.Schema({
    inSpreadFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inSpreadTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inSpreadBody: String,
    private: Boolean,
    inSpreadAt: {
        type: Date,
        default: Date.now()
    }
});

const InSpread = mongoose.model('InSpread', InSpreadSchema);

module.exports = InSpread;