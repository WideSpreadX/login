const mongoose = require('mongoose'); 
  
const videoSchema = new mongoose.Schema({ 
    videoOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    videoName: String,
    user_tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    catagory_tags: [String],
    video: 
    { 
        data: Buffer, 
        contentType: String 
    },
}); 
  

  
module.exports = new mongoose.model('Video', videoSchema); 