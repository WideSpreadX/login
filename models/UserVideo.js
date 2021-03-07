const mongoose = require('mongoose');


const UserVideoSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    likes: Number,
    dislikes: Number,
    source: String,
    uploadId: String,
    metadata: String,
    asset: String,
    filename: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const UserVideo = mongoose.model('UserVideo', UserVideoSchema);

module.exports = UserVideo;