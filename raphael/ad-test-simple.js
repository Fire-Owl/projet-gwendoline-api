const request = require("request");
const cheerio = require("cheerio");

request(
      "https://www.sportmag.fr/sport-handi",
      function (error, response, body) {
        if (error) {
          console.log(response.statusCode);
        }
        var country = [];
        var $ = cheerio.load(body);
        $(".edgtf-post-example-item-three-item").each(function (index, element) {
          country[index] = {};
          country[index]["thumbnail"] = $(element)
                .find(".edgtf-post-example-item-three-item img")
                .attr("src");
            country[index]["accroche"] = $(element)
                  .find("div.edgtf-post-example-item-three-item > div > div > p")
                  .text()
                  .trim();
            country[index]["lienarticle"] = $(element)
                  .find(".edgtf-post-example-item-three-item > div > a:nth-child(3)")
                  .attr("href");
          country[index]["titre"] = $(element)
            .find("div.edgtf-post-example-item-three-item > div > div > h3 > a")
            .text()
            .trim();
          country[index]["auteur"] = $(element)
            .find(".edgtf-post-info-author-link")
            .attr("href");
          country[index]["date"] = $(element)
            .find(".edgtf-post-info-date a span")
            .text();
        });
      console.log(country);
      })