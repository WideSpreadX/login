const mongoose = require('mongoose');


const ChatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    room: String,
    room_id: {
        type: String,
        unique: true
    },
    private: Boolean,
    messages: [
        {
            sent_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            sent_at: {
                type: Date,
                default: Date.now()
            },
            body: String,
            likes: Number
        }
    ]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;