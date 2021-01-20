const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const cheerio = require('cheerio');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

router.get('/', (req, res) => {

axios.get("https://www.oann.com/category/newsroom/").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

        $('.archive-grid').children('article').each(function(i, element) {

        const title = $(element).children('.content-grid-title').children('a').text();
        const articleImage = $(element).children('.content-grid-thumb').children('a').children('img').attr('src');
        const articleImageAlt = $(element).children('.content-grid-thumb').children('a').attr('title');
        const link = $(element).children('.content-grid-title').children('a').attr('href');
       /*  
        
        const time = $(element).children('.info').children('.info-header').children('.meta').children('div').children('.time').text();
        // Save the text of the element in a "title" variable
        
        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        
        const newsPreview = $(element).children('.info').children('.content').children('p').children('a').text()
        // Save these results in an object that we'll push into the results array we defined earlier
         */
        results.push({
            title: title,
            articleImage: articleImage,
            articleImageAlt: articleImageAlt,
            link: link,
            /*         
            newsPreview: newsPreview,
        time: time
        */
    });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        
        res.render('news-home', {currentPageTitle: 'News', results});
    });
});
router.get('/international', (req, res) => {
    const country = 'U.S.';

    newsapi.v2.topHeadlines({
        language: 'en',
        country: 'us'
      }).then(response => {
        console.log(response)
        res.render('news-international', {currentPageTitle: 'News', response, country});
    });
});
router.post('/international', (req, res) => {
    const country = req.body.country;

        res.redirect(`/news/international/${country}`);
});
router.get('/international/:country', (req, res) => {
    const country = req.params.country;

    newsapi.v2.topHeadlines({
        category: 'business',
        language: 'en',
        country: `${country}`
      }).then(response => {
        console.log(response)
        res.render('news-international', {currentPageTitle: 'News', response, country});
    });


        });


    //  https://www.newsmax.com/newsfront/



router.get('/newsmax', (req, res) => {
    axios.get("https://www.newsmax.com/newsfront/").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        

        $(".inside_cover_content").children('ul').children('li').each(function(i, element) {
        
        const articleImage = $(element).children('img').attr('src');
        const title = $(element).children('a').text();
        const newsPreview = $(element).children('#copy_small').text();
        const link = $(element).children('a').attr('href');
        
        results.push({
        articleImage: articleImage,
        title: title,
        link: link,
        newsPreview: newsPreview,
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.render('news-newsmax', {currentPageTitle: 'Newsmax', results});
        });
})
    

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
        res.render('news-politics', {currentPageTitle: 'Politics', results});
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
            res.render('news-technology', {currentPageTitle: 'Technology', results});
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



router.get('/health', (req, res) => {
    axios.get("https://medicalxpress.com/").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];
        

        $('.sorted-article').each(function(i, element) {
        
        const articleImage = $(element).children('figure').children('a').children('img').attr('src');
        const topic = $(element).children('.sorted-article-content').children('.sorted-article-topic').text();
        const title = $(element).children('.sorted-article-content').children('h2').children('a').text();
        const link = $(element).children('.sorted-article-content').children('h2').children('a').attr('href');
        const newsPreview = $(element).children('.sorted-article-content').children('p').text();
        const time = $(element).children('.sorted-article-content').children('.article__info').children('.mr-auto').children('p').text();

        results.push({
        articleImage: articleImage,
        topic: topic,
        title: title,
        link: link,
        newsPreview: newsPreview,
        time: time 
        });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.render('news-health', {currentPageTitle: 'Health', results});
        });
})
    


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