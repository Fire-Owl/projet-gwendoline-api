const request = require('request');
const cheerio = require('cheerio');

module.exports = function(results) {
    request(
        "http://www.handisport.org/?s=goalball",
        function (error, response, body) {
            if (error) {
                  return console.error('fetch fail handisport-goalball: ', error);
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
};
