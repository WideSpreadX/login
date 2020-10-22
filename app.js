const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const { response } = require('express');


const app = express();

require('./config/passport')(passport);
// DB Config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Middleware
app.use(bodyParser.json());
// Static
app.use(express.static('public'));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Method Override
// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Init gfs

/* // Create storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'public/uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  }); */
//  const upload = multer({ storage });
//Init gfs
const conn = mongoose.createConnection(db)

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

//Create storage object
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
}); 

const upload = multer({ storage });


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/business', require('./routes/businesses'));
app.use('/academy', require('./routes/academy'));
app.use('/news', require('./routes/news'));
app.use('/socialspread', require('./routes/socialspread'));
app.use('/flexfloor', require('./routes/flexfloor'));
app.use('/spreadshield', require('./routes/spreadshield'));
/* app.use('/upload', require('./routes/upload')); */

app.post('/upload', upload.single('user_image'), (req, res) => {
  console.log(`This is the data that was just uploaded: ${req.file}`)
  res.json({file: req.file})
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if Files
    if(!files || files.lenth === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files do exist
    return res.json(files)
  })
})

app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        // Check if Files
        if(!file || file.lenth === 0) {
          return res.status(404).json({
            err: 'That file does not exist'
          });
        }
    
        // Files do exist
        return res.json(file)
  })
})

app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        // Check if Files
        if(!file || file.lenth === 0) {
          return res.status(404).json({
            err: 'That file does not exist'
          });
        }
    
        // Files do exist
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read the output to the stream
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          })
        }
  })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));