const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
    resumeOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    bio: String,
    education: [{type: mongoose.Schema.Types.ObjectId, ref: 'School'}],
    employment_history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    special_skills: [String],
    us_veteran: Boolean,
    security_clearance: Boolean,
    willing_to_travel: Boolean
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;