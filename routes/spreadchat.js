const express = require('express');
const router = express.Router();
const User = require('../models/User');
const SpreadRoom = require('../models/SpreadRoom');
const {ensureAuthenticated } = require('../config/auth');
const {v4: uuidv4} = require('uuid')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


router.get('/', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('friends').exec()
    res.render('spreadchat-home', {user})
});


router.get('/text', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('friends').exec()
    
    res.render('spreadchat-text', {user})
    
    io.on('connection', (socket) => {
      console.log('a user connected');
    });
    
    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    
    
    io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    });
    



});


/* Video Chat */
router.get('/video', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const spreadrooms = await SpreadRoom.find({room_owner: {$eq: userId}})
    const user = await User.findById(userId).populate('friends').exec()
    res.render('spreadchat-video', {user, spreadrooms})
});

router.post('/video/create-spreadroom', ensureAuthenticated, async (req, res) => {
    const spreadroom = new SpreadRoom({
        room_owner: req.body.room_owner,
        room_name: req.body.room_name,
        room_description: req.body.room_description,
        room_color: req.body.room_color,
    })    
    spreadroom.save()
    res.redirect('/spreadchat/video');
});

router.post('/video/private', ensureAuthenticated, (req, res) => {
    const thisUser = req.user._id;
    const contact = req.body.userId;
    const spreadroom = uuidv4();
    console.log(`This User: ${thisUser}`);
    console.log(`Contact: ${contact}`);
    console.log(`SpreadRoom: ${spreadroom}`);

    res.redirect(`/spreadchat/video/private/${spreadroom}/${thisUser}/${contact}`)
})
router.get('/video/private/:spreadroomId/:thisUser/:contact', ensureAuthenticated, async (req, res) => {
    const thisUser = req.params.thisUser;
    const contact = req.params.contact;
    const spreadroomId = req.params.spreadroomId;

    res.render('spreadroom-private', {spreadroomId, thisUser, contact});
});

router.get('/video/:spreadroomId', ensureAuthenticated, async (req, res) => {
    const spreadroomId = req.params.spreadroomId;
    const spreadroom = await SpreadRoom.findById(spreadroomId);

    res.render('spreadroom', {spreadroom});
});

    
io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

module.exports = router;