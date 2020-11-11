const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const cheerio = require('cheerio');


router.get('/', (req, res) => {

/*     console.log("\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from reddit's webdev board:" +
    "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
axios.get("https://old.reddit.com/r/webdev").then(function(response) {

// Load the Response into cheerio and save it to a variable
// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
var $ = cheerio.load(response.data);

// An empty array to save the data that we'll scrape
var results = [];

// With cheerio, find each p-tag with the "title" class
// (i: iterator. element: the current element)
$("p.title").each(function(i, element) {

// Save the text of the element in a "title" variable
var title = $(element).text();

// In the currently selected element, look at its child elements (i.e., its a-tags),
// then save the values for any "href" attributes that the child elements may have
var link = $(element).children().attr("href");

// Save these results in an object that we'll push into the results array we defined earlier
results.push({
title: title,
link: link
});
});
 */



res.render('news-home', {currentPageTitle: 'News'});
});


    

router.get('/politics', (req, res) => {
    axios.get("https://www.foxnews.com/politics").then(function(response) {

        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(response.data);
        
        // An empty array to save the data that we'll scrape
        const results = [];
        
        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $(".article-list").children('.article').each(function(i, element) {
        
        const articleImage = $(element).children('.m').children('a').children('img').attr('src');
        const articleImageAlt = $(element).children('.m').children('a').children('img').attr('alt');
        
        const time = $(element).children('.info').children('.info-header').children('.meta').children('div').children('.time').text();
        // Save the text of the element in a "title" variable
        const title = $(element).children('.info').children('.info-header').children('h4').text();
        
        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        const link = $(element).children('.info').children('.info-header').children('h4').children('a').attr('href');
        
        const newsPreview = $(element).children('.info').children('.content').children('p').children('a').text()
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
        articleImage: articleImage,
        articleImageAlt: articleImageAlt,
        title: title,
        link: link,
        newsPreview: newsPreview,
        time: time
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.render('news-politics', {currentPageTitle: 'News', results});
        });
})

/* Election News */

router.get('/election', (req, res) => {
    axios.get("https://www.dailymail.co.uk/news/2020-election/index.html").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        $(".football-team-news").children('.article-small').each(function(i, element) {
        
            const articleImage = $(element).children('a').children('img').attr('src');
            const time = $(element).children('.channel-date-container').children('span').text();
            /*
         const articleImageAlt = $(element).children('.m').children('a').children('img').attr('alt');
        
        // Save the text of the element in a "title" variable
        */


        const title = $(element).children('h2').text();
        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        const link = $(element).children('h2').children('a').attr('href');
        const newsPreview = $(element).children('p').text()
        /*
        
        // Save these results in an object that we'll push into the results array we defined earlier */
        results.push({
            title: title,
            articleImage: articleImage,
            link: link,
            newsPreview: newsPreview,
            time: time
            /*         
            articleImageAlt: articleImageAlt,
         */
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.render('news-election', {currentPageTitle: 'Election News', results});
        });
})

router.get('/technology', (req, res) => {
    axios.get("https://www.techradar.com/news").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

        $(".listingResults").children('.listingResult').each(function(i, element) {
            const articleImage = $(element).children('a').children('article').children('.image').children('figure').attr('data-original');
/*         const articleImageAlt = $(element).children('.order-last').children('img').attr('alt'); */
        
const time = $(element).children('a').children('article').children('.content').children('header').children('.byline').children('time').text();
// Save the text of the element in a "title" variable
const title = $(element).children('a').children('article').children('.content').children('header').children('.article-name').text();
const newsPreview = $(element).children('a').children('article').children('.content').children('.synopsis').text()
const link = $(element).children('a').attr('href');
/* 
        
        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        
        // Save these results in an object that we'll push into the results array we defined earlier */
        results.push({
        articleImage: articleImage,
        /* articleImageAlt: articleImageAlt, */
        title: title,
        link: link,
        newsPreview: newsPreview,
        time: time
        });
        });

            console.log(results);
            res.render('news-technology', {currentPageTitle: 'Technology News', results});
        })
    
});




/* Business */

router.get('/business', (req, res) => {
    axios.get("https://www.foxnews.com/business").then(function(response) {

        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(response.data);
        
        // An empty array to save the data that we'll scrape
        const results = [];
        
        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $(".article-list").children('.article').each(function(i, element) {
            const title = $(element).children('.info').children('.info-header').children('h3').text();
       
        const articleImage = $(element).children('.m').children('a').children('picture').children('source').attr('srcset');
        const articleImageAlt = $(element).children('.m').children('a').children('img').attr('alt');
        
        const time = $(element).children('.info').children('.info-header').children('.meta').children('div').children('.time').text();
        // Save the text of the element in a "title" variable
        
        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        const link = $(element).children('.info').children('.info-header').children('h4').children('a').attr('href');
        
        const newsPreview = $(element).children('.info').children('.content').children('p').children('a').text()
        // Save these results in an object that we'll push into the results array we defined earlier
        
        results.push({
        title: title,
         articleImage: articleImage,
        articleImageAlt: articleImageAlt,
        link: link,
        newsPreview: newsPreview,
        time: time 
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.render('news-business', {currentPageTitle: 'Business News', results});
        });
});



/* 

                BLANK SCRAPING SETUP FOR NEWS

router.get('/newsCatagory', (req, res) => {
    axios.get("URL").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        $(".articleList").children('.article').each(function(i, element) {
        
        const articleImage = $(element).children('').children('img').attr('src');
        const articleImageAlt = $(element).children('').children('img').attr('alt');
        
        const time = $(element).children('').text();
        const title = $(element).children('').text();
        const link = $(element).children('').children('a').attr('href');
        const newsPreview = $(element).children('').text()

        results.push({
        articleImage: articleImage,
        articleImageAlt: articleImageAlt,
        title: title,
        link: link,
        newsPreview: newsPreview,
        time: time
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.render('news-', {currentPageTitle: ' News', results});
        });
});

*/
module.exports = router;