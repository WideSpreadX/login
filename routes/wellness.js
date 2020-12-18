const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const cheerio = require('cheerio');

const User = require('../models/User');
const Workout = require('../models/Workout');

router.get('/', (req, res) => {
    res.render('wellness-home', {currentPageTitle: 'Wellness Home'});
});

router.get('/workout', (req, res) => {

    axios.get("https://www.muscleandfitness.com/athletes-celebrities/news/").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

        $('.l-main__content').children('article').each(function(i, element) {

        const title = $(element).children('.article__content').children('.article__title').children('a').text();
        const articleImage = $(element).children('.article__thumbnail').children('.article__figure').children('img').attr('src');
        const link = $(element).children('.article__content').children('.article__title').children('a').attr('href');
        const newsPreview = $(element).children('.article__content').children('.article__subtitle').text();
     
        results.push({
        title: title,
        articleImage: articleImage,
        link: link,
        newsPreview: newsPreview,
        });
        });
        console.log(results);
    res.render('wellness-workout', {currentPageTitle: 'Workout Home', results});
});
});

// Yoga
router.get('/yoga', (req, res) => {

    axios.get("https://www.yogajournal.com/poses/types/standing/").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

        $('.o-section').children('.u-breakout').children('.c-block').each(function(i, element) {

        const title = $(element).children('.c-block__content').children('.c-block__inner').children('.c-block__title').children('a').text();
        const articleImage = $(element).children('.c-block__media').children('a').children('img').attr('src');
        const link = $(element).children('.c-block__content').children('.c-block__inner').children('.c-block__title').children('a').attr('href');
     
        results.push({
        title: title,
        articleImage: articleImage,
        link: link,
        });
        });
        console.log(results);
    res.render('wellness-yoga', {currentPageTitle: 'Yoga Home', results});
});
});

module.exports = router;
