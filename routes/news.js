const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const cheerio = require('cheerio');

/* axios.get('https://www.foxnews.com/politics').then((res) => {
    console.log(res.data)
})
 */
/* router.get('/scrape', (req, res) => {
    axios.get('https://www.foxnews.com/politics').then((res) => {
    const $ = cheerio.load(res.data);
    
    
    
    const scrapedArticles = $('article').map(function(i, el) {
        // this === el
        return $(this).attr('class', 'title').text();
    }).get().join('\n \n \n ');

    return scrapedArticles;
}) */
router.get('/', (req, res) => {

    console.log("\n***********************************\n" +
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

// Log the results once you've looped through each of the elements found with cheerio
console.log(results);
res.render('news-home', {currentPageTitle: 'News', results});
});

})
    


module.exports = router;