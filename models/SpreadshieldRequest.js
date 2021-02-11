const mongoose = require('mongoose');


const SpreadshieldRequestSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    make: String,
    model: String,
    year: String,
    questions: String
});

const SpreadshieldRequest = mongoose.model('SpreadshieldRequest', SpreadshieldRequestSchema);

module.exports = SpreadshieldRequest;