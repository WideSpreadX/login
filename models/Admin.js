const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    admin_type: String,
    security_clearance: Number,
    admin_link: String
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;