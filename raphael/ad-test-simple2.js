const request = require("request");
const cheerio = require("cheerio");

request(
      "https://www.handisport.org/category/expertise/",
      function (error, response, body) {
        if (error) {
          console.log(response.statusCode);
        }
        var country = [];
        var $ = cheerio.load(body);
        $(".col-md-4").slice(0, 4).each(function (index, element) {
          country[index] = {};
          country[index]["thumbnail"] = $(element)
                .find("a > div")
                .attr("style");
            country[index]["accroche"] = $(element)
                  .find(".arch")
                  .text()
                  .trim();
            country[index]["lienarticle"] = $(element)
                  .find("a")
                  .attr("href");
          country[index]["titre"] = $(element)
            .find("h2")
            .text()
            .trim();
          country[index]["auteur"] = $(element)
            .find(".edgtf-post-info-author-link")
            .attr("href");
          country[index]["date"] = $(element)
            .find(".date-actu")
            .text()
            .trim();
        });
      console.log(country);
      })