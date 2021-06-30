const app = require("express")();
const PORT = 3000;
const request = require("request");
const cheerio = require("cheerio");
const fetch = require("isomorphic-fetch");
const cron = require("node-cron");

// TEST CRON
cron.schedule("*/5 * * * * *", () => {
  console.log("test");
});

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
      $(".edgtf-peis-content-holder").each(function (index, element) {
        country[index] = {};
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
