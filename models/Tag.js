const mongoose = require('mongoose'); 
  
const tagSchema = new mongoose.Schema({ 
    tag_name: String,
    similar: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    color: String,
    tagged_by_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tag_for: {
        image: String,
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
        question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
        answer: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},
        workout: {type: mongoose.Schema.Types.ObjectId, ref: 'Workout'},
        workout_schedule: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutSchedule'},
        note: {type: mongoose.Schema.Types.ObjectId, ref: 'Note'},
        notebook: {type: mongoose.Schema.Types.ObjectId, ref: 'Notebook'},
        photo_album: {type: mongoose.Schema.Types.ObjectId, ref: 'PhotoAlbum'},
        group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
        class: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
        flashcard: {type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard'},
        appointment: {type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'},
    },
    
    
});

module.exports = new mongoose.model('Tag', tagSchema); 