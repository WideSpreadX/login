const mongoose = require('mongoose');


const SpreadRoomSchema = new mongoose.Schema({
    room_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    room_name: String,
    room_description: String,
    room_color: String,
    
});

const SpreadRoom = mongoose.model('SpreadRoom', SpreadRoomSchema);

module.exports = SpreadRoom;