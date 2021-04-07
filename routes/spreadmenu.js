const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');

const methodOverride = require('method-override');

const User = require('../models/User');
/* const Company = require('../models/Company');
const Group = require('../models/Group');
const Course = require('../models/Course');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');
const Item = require('../models/Item');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Chat = require('../models/Chat');
const Poll = require('../models/Poll');
const Question = require('../models/Question');
const Event = require('../models/Event');
const Resume = require('../models/Resume');
const Appointment = require('../models/Appointment');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const DepartmentTeam = require('../models/DepartmentTeam');
const Note = require('../models/Note');
const Notebook = require('../models/Notebook');
const Todo = require('../models/Todo');
const TodoList = require('../models/TodoList');
const Flashcard = require('../models/Flashcard');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const WorkoutSchedule = require('../models/WorkoutSchedule');
 */


router.patch('/save-image-url', ensureAuthenticated, async (req, res) => {
    const spreadId = req.params.spreadId;
    const userId = req.user._id;
    const imageUrl = req.body.imageURL;

    const user = await User.findByIdAndUpdate(userId, 
        {user_inspread_images: imageUrl},
        function(err, doc) {
            if(err) {
                console.log(err)
            } else {
                return
            }
        }
    )
    console.log(user)
    user.save()
    res.redirect('/dashboard')
});

module.exports = router;