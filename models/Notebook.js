const mongoose = require('mongoose'); 
  
const notebookSchema = new mongoose.Schema({ 
    notebookOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    notebookName: String,
    notebookDescription: String,
    notebookTags: [String],
    notebookColor: String,
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    notebookCreated: {type: Date, default: Date.now()}
}); 
  
//Notebook is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('Notebook', notebookSchema); 