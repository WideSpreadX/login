const mongoose = require('mongoose'); 
  
const imageCommentSchema = new mongoose.Schema({ 
    forPost: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    imageOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    img: 
    { 
        data: Buffer, 
        contentType: String 
    },
}); 
  
//profileImage is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('CommentImage', imageCommentSchema); 