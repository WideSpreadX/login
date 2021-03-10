const express = require('express');
const router = express.Router();

const {ensureAuthenticated } = require('../config/auth');

const axios = require('axios');
const cheerio = require('cheerio');



router.get('/', (req, res) => {
    


    
    res.render('shopping-home', {currentPageTitle: 'Shopping Home'})
});


/* 
                CLOTHING
 */
router.get('/clothing', (req, res) => {
    res.render('shopping-clothing', {currentPageTitle: 'Shopping Clothing'});

});

router.get('/clothing/reebok',(req, res) => {
    axios.get("https://www.reebok.com/us/men?grid=true").then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

   $('.grid-item___3rAkS').each(function(i, element) {
        const test = $(element).text();
        const test2 = $(element).children('img').attr('src');
         const item = $(element).children('div').children('div').children('div').children('.gl-product-card-container').children('.gl-product-card').children('.gl-product-card__details').children('a').children('.gl-product-card__details-main').children('span').text();
        const link = $(element).children('div').children('div').children('div').children('.gl-product-card-container').children('.gl-product-card').children('.gl-product-card__details').children('a').attr('href');
        const itemImage = $(element).children('div').children('div').children('div').children('.gl-product-card-container').children('.gl-product-card').children('.gl-product-card__assets').children('.gl-product-card__assets-link').children('img').attr('src');
        const itemImageAlt = $(element).children('div').children('div').children('div').children('.gl-product-card').children('.gl-product-card__assets').children('a').children('img').attr('alt');
        const price = $(element).children('div').children('div').children('div').children('.gl-product-card').children('.gl-product-card__details').children('a').children('.gl-product-card__details-main').children(".gl-price").children('.gl-price-item').text();
        const reload = $('.pagination__control___3VPhx').data()
                results.push({
                    test: test,
                    test2: test2,
                    item: item,
                    link: link,
                    price: price,
                    itemImage: itemImage,
                    itemImageAlt: itemImageAlt
                     
            });
        });
    res.render('shopping-reebok', {currentPageTitle: 'Reebok', results});
});
});


/* Electronics */


router.get('/electronics', async (req, res) => {
    const bby = require('bestbuy')(process.env.BEST_BUY_API_KEY);
    bby.products('search=tv',{show:'sku,name,salePrice,modelNumber,image'}).then(function(data){
      console.log(data);
    });
    res.render('shopping-electronics', {currentPageTitle: 'Shopping Electronics', data});
})
router.get('/electronics/tv', (req, res) => {

    res.render('shopping-electronics', {currentPageTitle: 'Shopping Electronics TV'});
})
router.get('/electronics/appliances', (req, res) => {

    res.render('shopping-electronics', {currentPageTitle: 'Shopping Electronics Appliances'});
})
router.get('/electronics/phones-tablets', (req, res) => {

    res.render('shopping-electronics', {currentPageTitle: 'Shopping Electronics Phones & Tablets'});
})
router.get('/electronics/cameras', (req, res) => {

    res.render('shopping-electronics', {currentPageTitle: 'Shopping Electronics Cameras'});
})
router.get('/electronics/computers', (req, res) => {

    res.render('shopping-electronics', {currentPageTitle: 'Shopping Electronics Computers'});
})

/* 
                Outdoors & Camping
 */
router.get('/outdoors-camping', (req, res) => {

    const featuredResults = axios.get('https://www.ems.com/brands/eastern-mountain-sports/shop-all/?page=1&size=120&sort=featured').then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

   $('.jss442').each(function(i, element) {
        const test = $(element).html();
        const item = $(element).children('a').children('.jss453').children('.jss452').text();
        const itemImage = $(element).children('a').children('.jss453').children('.jss446').children('.jss447').children('.jss456').children('jss457').attr('src');
        const link = $(element).children('a').attr('href');
        const price = $(element).children('a').children('.jss453').children('.jss476').children('span').text();

                results.push({
                    link: link,
                    item: item,
                    price: price,
                    itemImage: itemImage,
            });
        });
    res.render('shopping-outdoors-camping', {currentPageTitle: 'Shopping Outdoors & Camping', results, featuredResults, tentResults})
});
    const tentResults = axios.get('https://www.ems.com/brands/eastern-mountain-sports/shop-all/camping-gear/tents/');
    const sleepingBagResults = axios.get('https://www.ems.com/brands/eastern-mountain-sports/shop-all/camping-gear/sleeping-bags-and-pads/');
    const backpackResults = axios.get('https://www.ems.com/brands/eastern-mountain-sports/shop-all/camping-gear/backpacks/');
    const campFurnitureResults = axios.get('https://www.ems.com/brands/eastern-mountain-sports/shop-all/camping-gear/camp-furniture/');

    const allCalls = Promise.all([featuredResults, tentResults/* , sleepingBagResults, backpackResults,campFurnitureResults */]);
    console.log(`Featured Results: ${featuredResults}`);
    Promise.all([featuredResults, tentResults/* , sleepingBagResults, backpackResults,campFurnitureResults */]).then(
    )


});


// Firearms
router.get('/outdoors-camping/firearms', (req, res) => {
         res.render('shopping-firearm', {currentPageTitle: 'Shopping Firearms'})
});

router.get('/outdoors-camping/firearms/shotguns', (req, res) => {
    axios.get('https://www.guns.com/firearms/shotguns/semi-auto?itemsPerPage=96').then(function(response) {
        const $ = cheerio.load(response.data);
        const results = [];

   $('.category-listing-list').children('.detailed-card').each(function(i, element) {
        const test = $(element).html();
        const item = $(element).children('.content').children('.title').children('a').text();
        const link = $(element).children('.content').children('.title').children('a').attr('href');

                        results.push({
                    test: test,
                    item: item,
                    link: link,
                });
        });
         res.render('shopping-shotguns', {currentPageTitle: 'Shopping Shotguns', results})
});
});



module.exports = router;


/* 

                                        ASYNC PARALLEL

                             To let pages load when scraping them



pools = [
    "http://www.scrape-site.com/1",
    "http://www.scrape-site.com/2",
    "http://www.scrape-site.com/3",
    "http://www.scrape-site.com/4",
    "http://www.scrape-site.com/5"
    ]

   var request = require("request");
   var cheerio = require("cheerio");
   var async = require("async");
   var poolsLength = pools.length;

   var queue = [];
   for (var i = 0 ; i < pools.length ; i++) {
     queue.push(function(callback) {
        var url = pools[i];
        request(url, function (error, response, body) {
        if (!error) {
        var $ = cheerio.load(body,{
         ignoreWhitespace: true
       });
      var name = [];
      var address = [];
      var website = [];
     


     $('body').each(function(i, elem){
         name = $(elem).find('.fn').text();
         address = $(elem).find('.preptime').text();
         website = $(elem).find('.m_content_recette_ingredients').text();
         console.log(name+"±"+address+"±"+website);}
     )} else {
         // error? forget it, if you want to stop when error? just use async.queue
        callback(null, url);   
     };

      // Do something with the result you get here
      // mark as done
      callback(null, url);
    })
     })
      
   };

  async.parallel(queue, function (err, result) {
     if (err) throw err;
     console.log("DONE");
     // you can also log the `result` to see what happened after the queue
  })

 */