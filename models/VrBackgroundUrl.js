const mongoose = require('mongoose'); 
  
const vrBackgroundImageUrlSchema = new mongoose.Schema({ 
    vr_image_url: String,
    image_name: String
}); 
  
//UserBackgroundImage is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('VrBackgroundImageUrl', vrBackgroundImageUrlSchema); 