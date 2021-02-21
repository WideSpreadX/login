const mongoose = require('mongoose'); 
  
const movieSchema = new mongoose.Schema({ 
    name: String,
    link: String,
    poster: String,
    genre: String,
    rated: String,
    spread_genre: String,
    for_kids: Boolean
}); 
  
  
module.exports = new mongoose.model('Movie', movieSchema); 