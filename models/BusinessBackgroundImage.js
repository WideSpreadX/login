const mongoose = require('mongoose'); 
  
const businessBackgroundImageSchema = new mongoose.Schema({ 
    imageOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    img: 
    { 
        data: Buffer, 
        contentType: String 
    },
}); 
  
//BusinessBackgroundImage is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('BusinessBackgroundImage', businessBackgroundImageSchema); 