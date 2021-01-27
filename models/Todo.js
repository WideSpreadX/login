const mongoose = require('mongoose'); 
  
const todoSchema = new mongoose.Schema({ 
    todoOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    todoName: String,
    todoDescription: String,
    todos: [{
        todoName: String,
        todoPriority: Number,
        complete: Boolean
    }],
    todoColor: String,
    todosTotal: Number,
    todosCompleted: Number,
    todoDue: Date,
    todoCreated: {
        type: Date,
        default: Date.now()
    }
}); 
  
  
module.exports = new mongoose.model('Todo', todoSchema); 