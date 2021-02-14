const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
// User Model
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Flashcard = require('../models/Flashcard');
const Notebook = require('../models/Notebook');
const Note = require('../models/Note');

router.get('/', async (req, res) => {
    const user = req.user.id;
    const notebooks = await Notebook.find({notebookOwner: {$eq: user}}).populate('notes').exec()
    const thisUser = await User.findById(user);

    res.render('notebook-home', {thisUser, notebooks})
})

router.post('/new', (req, res) => {
    const notebook = new Notebook({
        notebookOwner: req.user.id,
        notebookName: req.body.notebookName,
        notebookDescription: req.body.notebookDescription,
        notebookColor: req.body.notebookColor
    })
    notebook.save()
    res.redirect('/notebooks');
});

router.post('/note/new/:notebookId', async (req, res) => {
    const notebookId = req.params.notebookId;
    const note = new Note({
        noteFrom: notebookId,
        noteTitle: req.body.noteTitle,
        noteCategory: req.body.noteCategory,
        noteColor: req.body.noteColor,
        noteBody: req.body.noteBody
    })
    note.save()
    await Notebook.findByIdAndUpdate(notebookId,
        {$addToSet: {notes: note._id}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                console.log(err);
            }else{
                
                return
            }
        }
        )
        res.redirect(req.get('referer'));
})
module.exports = router;