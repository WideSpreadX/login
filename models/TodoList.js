const mongoose = require('mongoose'); 
  
const todoListSchema = new mongoose.Schema({ 
    todoListOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}],
}); 
  
  
module.exports = new mongoose.model('TodoList', todoListSchema); 