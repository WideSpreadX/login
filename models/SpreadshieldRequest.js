const mongoose = require('mongoose');


const SpreadshieldRequestSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    make: String,
    model: String,
    year: String,
    driver_package: Boolean,
    passenger_package: Boolean,
    communications_package: Boolean,
    driver_assistance: Boolean,
});

const SpreadshieldRequest = mongoose.model('SpreadshieldRequest', SpreadshieldRequestSchema);

module.exports = SpreadshieldRequest;