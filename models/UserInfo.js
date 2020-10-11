const mongoose = require('mongoose');


const UserInfoSchema = new mongoose.Schema({
    infoOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    age: Number,
    town: String,
    state: String,
    zip: String,
    country: String,
    phone1: String,
    phoneType1: String,
    phone2: String,
    phoneType2: String,
    gender: String,
    relationshipStatus: String,
    favColor1: String,
    favColor2: String,
    favColor3: String,
    about: String,
    social: {
        github: String,
        linkedin: String,
        facebook: String,
        instagram: String,
        twitter: String,
        pinterest: String
    }

});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;