const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/User');
const Movie = require('../models/Movie');
const UserVideo = require('../models/UserVideo');
const Mux = require('@mux/mux-node');
const { Video } = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);
const upChunk = require('@mux/upchunk');
const { json, send } = require('micro');
const uuid = require('uuid');
const fs = require('fs');





router.get('/', async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    res.render('ent-home', {user});
})
router.get('/movies', async (req, res) => {
    const movies = await Movie.find()
    const comedies = await Movie.find({genre: {$eq: "Comedy"}})
    const action = await Movie.find({genre: {$eq: "Action, Thriller"}})
    const actionSciFi = await Movie.find({genre: {$eq: "Action, Sci-Fi"}})
    const actionAdventure = await Movie.find({genre: {$eq: "Action, Adventure"}})
    const horrorMysteryThriller = await Movie.find({genre: {$eq: "Horror, Mystery, Thriller"}})


    res.render('movies-home', {movies, comedies, action, actionSciFi, actionAdventure, horrorMysteryThriller});
});

router.get('/movies-user', ensureAuthenticated, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const movieList = user.movie_list; 

    res.render('movies-home-user', {movieList});

});

router.get('/kids/movies', async (req, res) => {
    const movies = await Movie.find({rated: {$eq: "PG"}})
    const comedies = await Movie.find({rated: {$eq: "PG"}, genre: {$eq: "Comedy"}})



    res.render('movies-home-kids', {movies, comedies});
});

router.post('/movies/search', (req, res) => {
    const movie = req.body.movie;
    const movieString = req.body.movie;
    const convertedString = movieString.replace(/\s/g, '+')
    res.redirect(`/entertainment/movies/${convertedString}`);
})
router.get('/movies/:movie', (req, res) => {
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;

    res.render('ent-movie-info', {returnedData, movie});
}).catch(function (error) {
	console.error(error);
});
});



router.get('/movies/:movie/vr', async (req, res) => {
    const movie = req.params.movie;

    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;

    res.render('ent-movie-info-vr', {layout: './layouts/vr-ar', returnedData, movie});
}).catch(function (error) {
	console.error(error);
});
})
router.get('/movies/:movie/spreadshield', async (req, res) => {
    const movie = req.params.movie;

    const apiKey = 'd3722e71'
	const options = {
  method: 'GET',
  url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
};

axios.request(options).then(function (response) {
    const returnedData = response.data;

    res.render('ent-movie-info-spreadshield', {returnedData, movie});
}).catch(function (error) {
	console.error(error);
});
})

router.post('/movies/save', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const movieLink = req.body.movie_title;
    const movieName = req.body.movie_name;
    await User.findByIdAndUpdate(user, 
            {$addToSet: {movie_list: {movie_link: movieLink, movie_name: movieName}}},
        )
    res.redirect(`/entertainment/movies/${movieName}`)
});

router.post('/movies/add-to-recommended', ensureAuthenticated, (req, res) => {
    const movieString = req.body.name;
    const convertedString = movieString.replace(/\s/g, '+');
    const movie = new Movie({
        name: movieString,
        link: convertedString,
        poster: req.body.poster,
        genre: req.body.genre,
        rated: req.body.rated
    })
    movie.save()

    res.redirect('/entertainment/movies');

})

router.get('/videos', async (req, res) => {
    const userId = req.user._id;

    const user =  await User.findById(userId);

    res.render('ent-videos', {user});
});

router.get('/videos/:userId', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const userVideo = await UserVideo.find({creator: {$eq: userId}});

    res.render('ent-user-dash', {user, userVideo});
});

router.get('/videos/:userId/upload', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.render('ent-video-upload', {user});

});

router.post('/videos/upload-it', (req, res) => {
    const user = req.user._id;
    const file = req.body.source;

    Video.Uploads.create({
        cors_origin: 'https://widespread-beta.herokuapp.com', 
        new_asset_settings: {
          playback_policy: 'public'
        }
      }).then(upload => {
        
          // upload.url is what you'll want to return to your client.
          console.log(`Video URL: ${upload}`);
          const playbackId = Video.Assets.create({input: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4'});

          const userVideo = new UserVideo({
            creator: user,
            title: req.body.title,
            description: req.body.description,
            source: upload.url,
            asset: upload.id,
            playback_id: playbackId
          })
          userVideo.save()

          console.log(`Playback ID: ${playbackId}`)
/*              axios.post(`https://api.mux.com/video/v1/assets`).then(function(response) {
            
          }) */

        res.redirect(`/entertainment/videos/${user}`);
      });
});  

router.get('/videos/:userId/upload-done', async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    const db = await UserVideo.find({creator: {$eq: userId}});
    const { type: eventType, data: eventData } = await json(req);

    switch (eventType) {
      case 'video.asset.created': {
        // This means an Asset was successfully created! We'll get
        // the existing item from the DB first, then update it with the 
        // new Asset details
        const item = await db.get(eventData.passthrough);
        // Just in case the events got here out of order, make sure the
        // asset isn't already set to ready before blindly updating it!
        if (item.asset.status !== 'ready') {
          await db.put(item.id, {
            ...item,
            asset: eventData,
          });
        }
        break;
      };
      case 'video.asset.ready': {
        // This means an Asset was successfully created! This is the final
        // state of an Asset in this stage of its lifecycle, so we don't need
        // to check anything first.
          const item = await db.get(eventData.passthrough);
        await db.put(item.id, { 
          ...item, 
          asset: eventData,
          });
        break;
      };
      case 'video.upload.cancelled': {
        // This fires when you decide you want to cancel an upload, so you
        // may want to update your internal state to reflect that it's no longer
        // active.
        const item = await db.findByUploadId(eventData.passthrough);
        await db.put(item.id, { ...item, status: 'cancelled_upload' });
      }
      default:
        // Mux sends webhooks for *lots* of things, but we'll ignore those for now
        console.log('some other event!', eventType, eventData);
  }  

  res.render('ent-video-upload-complete', {item, eventType, eventData});
});

module.exports = router;