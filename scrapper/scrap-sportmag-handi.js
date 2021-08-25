const request = require('request');
const cheerio = require('cheerio');

module.exports = function(results,search) {
      request(

            "https://www.sportmag.fr/?s=handisport+"+search,
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
      console.log("https://www.sportmag.fr/?s=handisport+"+search);
};

