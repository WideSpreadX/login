const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    town: String,
    state: String,
    zip: String,
    country: String,
    friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    about: String,
    social: {
        github: String,
        linkedin: String,
        facebook: String,
        instagram: String,
        twitter: String,
        pinterest: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.addFriend = function(friend)  {
    let friendList = this.friends;
    
    friendList.push({friendId: this.friendId});
    
    this.save();
}
 
const User = mongoose.model('User', UserSchema);

module.exports = User;