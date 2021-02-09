const mongoose = require('mongoose');


const PollSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    poll_image: String,
    poll_video: String,
    poll_audio: String,
    poll_body: String,
    poll_reply1: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply2: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply3: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply4: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply5: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply6: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    votes: [
        {
            vote_for: String,
            voted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;