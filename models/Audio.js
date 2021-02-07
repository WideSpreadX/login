const mongoose = require('mongoose'); 
  
const audioSchema = new mongoose.Schema({ 
    audioOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    audio_name: String,
    user_tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    catagory_tags: [String],
    audio: 
    { 
        data: Buffer, 
        contentType: String 
    },
}); 
  

  
module.exports = new mongoose.model('Audio', audioSchema); 