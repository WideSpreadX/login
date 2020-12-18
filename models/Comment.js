const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    commentBody: String,
    likes: Number,
    fromPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;