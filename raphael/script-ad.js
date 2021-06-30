// CETTE PAGE DOIT RÉCUPÉRER LES 2 PREMIERS ARTICLES DE www.sportmag.fr/sport-handi

const app = require("express")();
const PORT = 3001;
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
            country[index]["thumbnail"] = $(element)
                  .find("img")
                  .attr("href");
            country[index]["titre"] = $(element)
                  .find(".edgtf-peis-title")
                  .text()
                  .trim();
            country[index]["auteur"] = $(element)
                  .find(".edgtf-post-info-author-link")
                  .attr("href");
            country[index]["date"] = $(element)
                  .find(".edgtf-post-info-date a span")
                  .text();
      });

      res.json(country);
    }
  )
);
