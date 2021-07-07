const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/', function (req, res) {

    let url = 'http://www.handisport.org/?s=goalball';

    request(url, function (error, response, html) {
        if (!error) {

            let goalball = [];
            let $ = cheerio.load(html);

            //slice() permet de récupérer un nombre limité d'articles
            $(".col-md-4").slice(0, 4).each(function (index, element) {
                goalball[index] = {};
                goalball[index]["titre"] = $(element)
                    .find("h2")
                    .text()
                    .trim();

                goalball[index]["lien"] = $(element)
                    .find("a")
                    .attr("href");

                goalball[index]["thumbnail"] = $(element)
                    .find("a > div")
                    .attr("style").replace('background:url(\'', '').replace('\') no-repeat', '');

                goalball[index]["date"] = $(element)
                    .find(".date-actu")
                    .text()
                    .trim();

                goalball[index]["description"] = $(element)
                    .find("div.arch")
                    .text().replace(/\s\s+/g, '')
                    .trim();

            });

            res.json(goalball);

        }
    });

});



app.listen('3000');
console.log('API is running on http://localhost:3000'); module.exports = app;

