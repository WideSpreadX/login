const mongoose = require('mongoose'); 
  
const linkSchema = new mongoose.Schema({ 
    spread_link: String,
    name: String,
    zone: Number,
    url: String,
    age_restrictions: Number,
    description: String,
    help_points: [{
        title: String,
        description: String,
        body: String,
        tags: {
            primary: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},
            secondary: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},
            helpers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
        }
    }],
    tags: {
        primary: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},
        secondary: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},
        helpers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
    }
}); 
  
module.exports = new mongoose.model('Link', linkSchema); 