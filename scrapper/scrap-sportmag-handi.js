// CETTE PAGE DOIT RÉCUPÉRER LES 2 PREMIERS ARTICLES DE www.sportmag.fr/sport-handi

const app = require("express")();
const PORT = 3002;
const request = require("request");
const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");
const cron = require("node-cron");

// TEST REST API
app.listen(PORT, () => console.log(`it's alive on http//localhost:${PORT}`));
app.get("/coucou", (req, res) => {
  /* console.log("function coucou");
  res.raw('coucou function'); */
  console.log(res);
})

app.get("/", (req, res) =>
  request(
    "https://www.sportmag.fr/sport-handi",
    function (error, response, body) {
      if (error) {
        res.send(response.statusCode);
      }
      var country = [];
      var $ = cheerio.load(body);
      $(".edgtf-post-example-item-three-item").each(function (index, element) {
            country[index] = {};
            country[index]["titre"] = $(element)
                  .find("div.edgtf-post-example-item-three-item > div > div > h3:nth-child(1) > a:nth-child(1)")
                  .text()
                  .trim();
            country[index]["date"] = $(element)
                  .find(".edgtf-post-info-date a span")
                  .text();
            country[index]["accroche"] = $(element)
                  .find("div.edgtf-post-example-item-three-item > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)")
                  .text();
            /* country[index]["auteur"] = $(element)
                  .find(".edgtf-post-info-author-link")
                  .attr("href"); */
            country[index]["lien"] = $(element)
                  .find("div.edgtf-post-example-item-three-item > div:nth-child(1) > a:nth-child(3)")
                  .attr("href");
            country[index]["thumbnail"] = $(element)
                  .find("div.edgtf-post-example-item-three-item > div:nth-child(1) > div:nth-child(2) > img:nth-child(1)")
                  .attr("src");
      });

      res.json(country);
    }
  )
);
