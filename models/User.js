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
    phone1: String,
    phoneType1: String,
    phone2: String,
    phoneType2: String,
    gender: String,
    relationshipStatus: String,
    favColor1: String,
    favColor2: String,
    favColor3: String,
    academy_info: {
        current_courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            current_grade: Number
        }],
        completed_courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            final_grade: Number
        }],
        gpa: Number
    },
    friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    inSpreads: [{
        inSpread: {type: mongoose.Schema.Types.ObjectId, ref: 'InSpread'}
    }],
    likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likedComments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    notebookCollection: [{type: mongoose.Schema.Types.ObjectId, ref: 'NotebookCollection'}],
    todoLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'TodoList'}],
    about: String,
    current_occupation: String,
    social: {
        github: String,
        linkedin: String,
        facebook: String,
        instagram: String,
        twitter: String,
        pinterest: String
    },
    user_background_image: String,
    user_images: [String],
    user_avatar: String,
    user_video: [String],
    resume: {type: mongoose.Schema.Types.ObjectId, ref: 'Resume'},
    workouts: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutSchedule'},
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