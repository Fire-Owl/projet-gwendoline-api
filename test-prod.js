const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cron = require('node-cron');
const cors = require('cors');
const app = express();
app.use(cors());

let promises = [];
let results = [];

cron.schedule('*/0,10,20,30,40,50 * * * *', () => {
    console.log('cron refresh');
    results = [];
    request(

      "https://www.sportmag.fr/?s=handisport",
      function (error, response, body) {
          let article = [];
          let $ = cheerio.load(body);
          $("article").slice(0, 4).each(function (index, element) {
              article[index] = {};
              article[index]["titre"] = $(element)
                  .find("h3 a")
                  .text()
                  .trim();
              article[index]["lien"] = $(element)
                  .find("h3 a")
                  .attr("href");
              article[index]["thumbnail"] = $(element)
                  .find(".wp-post-image")
                  .attr("data-src");
              article[index]["date"] = $(element)
                  .find(".jeg_meta_date a")
                  .text();
              article[index]["description"] = $(element)
                  .find(".jeg_post_excerpt p")
                  .text();
          });

          results.push(article);
      }
   );


   request(
      "http://www.handisport.org/?s=goalball",
      function (error, response, body) {
          if (error) {
              reject.send(response.statusCode);
          }
          let article = [];
          let $ = cheerio.load(body);
          $(".col-md-4").slice(0, 4).each(function (index, element) { //slice permet ici de récupérer seulement un certain nombre d'articles
              article[index] = {};
              article[index]["titre"] = $(element)
                  .find("h2")
                  .text()
                  .trim();

              article[index]["lien"] = $(element)
                  .find("a")
                  .attr("href");

              article[index]["thumbnail"] = $(element)
                  .find("a > div")
                  .attr("style").replace('background:url(\'', '').replace('\') no-repeat', '');

              article[index]["date"] = $(element)
                  .find(".date-actu")
                  .text()
                  .trim();

              article[index]["description"] = $(element)
                  .find("div.arch")
                  .text().replace(/\s\s+/g, '')
                  .trim();

          });

          results.push(article);
      }
  );
});

app.get('/', function (req, res) {
      
      res.json(results);

});

        // HANDISPORT/GOALBALL


        // HANDISPORT/EXPERTISE
/* 
        promises.push(
            new Promise((resolve, reject) => {
                request(
                    "https://www.handisport.org/category/expertise/",
                    function (error, response, body) {
                        if (error) {
                            reject.send(response.statusCode);
                        }
                        let article = [];
                        let $ = cheerio.load(body);
                        $(".col-md-4").slice(0, 4).each(function (index, element) {
                            article[index] = {};
                            article[index]["titre"] = $(element)
                                .find("h2")
                                .text()
                                .trim();

                            article[index]["lien"] = $(element)
                                .find("a")
                                .attr("href");

                            article[index]["thumbnail"] = $(element)
                                .find("a > div")
                                .attr("style").replace('background:url(\'', '').replace('\') no-repeat', '');

                            article[index]["date"] = $(element)
                                .find(".date-actu")
                                .text()
                                .trim();

                            article[index]["description"] = $(element)
                                .find("div.arch")
                                .text().replace(/\s\s+/g, '')
                                .trim();

                        });

                        return resolve(article);
                    }
                );
            })
        ); */

        // REPONSE






app.listen('3000');
console.log('API is running on http://adrienr.promo-68.codeur.online:3000/'); module.exports = app;