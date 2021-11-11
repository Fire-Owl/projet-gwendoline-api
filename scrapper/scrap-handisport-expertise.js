const request = require('request');
const cheerio = require('cheerio');

module.exports = function(results) {
      
    request(
        "https://www.handisport.org/category/expertise/",
        function (error, response, body) {
            if (error) {
                  return console.error('fetch fail handisport-expertise: ', error);
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

            results.push(article);
        }
    );
};
