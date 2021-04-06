const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');


const axios = require('axios');


router.get('/', (req, res) => {
    const user = req.user._id;

    const options = {
        method: 'GET',
        url: `https://www.eporner.com/api/v2/video/search/?query=young%20girl%20blowjob&thumbsize=big&per_page=100&format=json`
      };
      
      axios.request(options).then(function (response) {
          const returnedData = response.data;
          console.log(returnedData.videos)
          res.render('./sld/home', {returnedData, user});
      }).catch(function (error) {
          console.error(error);
      });

});
router.get('/:userId', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    res.render('./sld/user', {userId, user})
});

router.post('/video/search', (req, res) => {
    const query = req.body.query;
    res.redirect(`/sld/video/search/${query}`)
});

router.get('/video/search/:query', async (req, res) => {
    const user = req.user._id;
    const query = req.params.query;
    const options = {
        method: 'GET',
        url: `https://www.eporner.com/api/v2/video/search/?query=${query}&thumbsize=big&per_page=100&format=json`
      };
      
      axios.request(options).then(function (response) {
          const returnedData = response.data;
          console.log(returnedData.videos)
          res.render('./sld/results', {returnedData, user});
      }).catch(function (error) {
          console.error(error);
      });

});

router.get('/video/:videoId', (req, res) => {
    const videoId = req.params.videoId;

    const options = {
        method: 'GET',
        url: `https://www.eporner.com/api/v2/video/id/?id=${videoId}&thumbsize=big&format=json`
      };
      
      axios.request(options).then(function (response) {
          const returnedData = response.data;
          console.log(returnedData)
          res.render('./sld/single', {returnedData});
      }).catch(function (error) {
          console.error(error);
      });

});


module.exports = router;