const mongoose = require('mongoose');


const ChatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    room: String,
    room_id: {
        type: String,
        unique: true
    },
    private: Boolean,
    messages: [String]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;