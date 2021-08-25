const app = require("express")();
const PORT = process.env.PORT || 3000;
const request = require("request");
const cheerio = require("cheerio");
const cron = require("node-cron");

let promises = [];
// let sport = "goalball";

// TEST CRON toutes les 6 heures
// cron.schedule("* **/6 ***", () => {
  /*------------------------------------------- REPONSE */
  app.get("/goalball_api/:sport", (req, res) => {
  // scrapper2();
  scraper(req.params.sport);
  // console.log(sport);
  Promise.all(promises)
  .then((results) => {
  // console.log(sport);
  res.json(results);
})
  .catch((error) => {
    console.log(error);
  });
});

/*------------------------------------------- SPORTMAG.FR */

function scraper(sport) {

  promises = [];
  
  promises.push(
    new Promise((resolve, reject) => {
    request(
    `https://www.handisport.org/?s=${sport}`,
    function (error, response, body) {
    if (error) {
    reject.send(response.statusCode);
    }
    let article = [];
    let $ = cheerio.load(body);
    $(".col-md-4")
    .slice(0, 10)
    .each(function (index, element) {
    article[index] = {};
    article[index]["link"] = $(element).find("a").attr("href");
    article[index]["title"] = $(element).find("h2").text().trim();
    article[index]["thumbnail"] =
    $(element)
    .find("a > div")
    .attr("style")
    .replace("background:url('", "")
    .replace("') no-repeat", "")
    .slice(0, -12) +
    $(element)
    .find("a > div")
    .attr("style")
    .replace("background:url('", "")
    .replace("') no-repeat", "")
    .slice(-4);
    
    article[index]["date"] = $(element)
    .find(".date-actu")
    .text()
    .trim();
    
    article[index]["descr"] = $(element)
    .find("div.arch")
    .text()
    .replace(/\s\s+/g, "")
    .trim();
    });
    
    return resolve(article);
    }
    );
    })
    );

    promises.push(
      new Promise((resolve, reject) => {
        request(
          "https://www.sportmag.fr/?s=handisport",
          function (error, response, body) {
  if (error) {
  reject.send(response.statusCode);
  }
  let article = [];
  const $ = cheerio.load(body);
  
  $("article")
  .slice(0, 2)
  .each(function (index, element) {
  article[index] = {};
  article[index]["titre"] = $(element).find("h3 a").text().trim();
  article[index]["lien"] = $(element).find("h3 a").attr("href");
  article[index]["thumbnail"] = $(element)
  .find(".wp-post-image")
  .attr("data-src");
  article[index]["date"] = $(element).find(".jeg_meta_date a").text();
  article[index]["description"] = $(element)
  .find(".jeg_post_excerpt p")
  .text();
  });
  
  return resolve(article);
  }
  );
  })
  );

}

// function scrapper2() {

//   promises.push(
//     new Promise((resolve, reject) => {
//       request(
//         "https://www.sportmag.fr/?s=handisport",
//         function (error, response, body) {
// if (error) {
// reject.send(response.statusCode);
// }
// let article = [];
// const $ = cheerio.load(body);

// $("article")
// .slice(0, 2)
// .each(function (index, element) {
// article[index] = {};
// article[index]["titre"] = $(element).find("h3 a").text().trim();
// article[index]["lien"] = $(element).find("h3 a").attr("href");
// article[index]["thumbnail"] = $(element)
// .find(".wp-post-image")
// .attr("data-src");
// article[index]["date"] = $(element).find(".jeg_meta_date a").text();
// article[index]["description"] = $(element)
// .find(".jeg_post_excerpt p")
// .text();
// });

// return resolve(article);
// }
// );
// })
// );
  
// }
// console.log(sport);

/*------------------------------------------- HANDISPORT */
// });


app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));