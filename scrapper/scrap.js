const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cron = require('node-cron');
const app = express();


cron.schedule('*/0,10,20,30,40,50 * * * *', () => {
    console.log('cron refresh');
 
let promises = [];
    
    app.get('/', function (req, res) {

        // SPORTMAG.FR

        promises.push(
            new Promise((resolve, reject) => {
                request(
                    
                    "https://www.sportmag.fr/?s=handisport",
                    function (error, response, body) {
                        if (error) {
                            reject.send(response.statusCode);
                        }
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
                                .find(".edgtf-post-info-date a span")
                                .text();
                            article[index]["description"] = $(element)
                                .find("div.edgtf-post-example-item-three-item > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)")
                                .text();
                        });

                        return resolve(article);
                    }

                    /*

                    "https://www.sportmag.fr/sport-handi",
                    function (error, response, body) {
                        if (error) {
                            reject.send(response.statusCode);
                        }
                        let article = [];
                        let $ = cheerio.load(body);
                        $(".edgtf-post-example-item-three-item").each(function (index, element) {
                            article[index] = {};
                            article[index]["titre"] = $(element)
                                .find("div.edgtf-post-example-item-three-item > div > div > h3:nth-child(1) > a:nth-child(1)")
                                .text()
                                .trim();
                            article[index]["date"] = $(element)
                                .find(".edgtf-post-info-date a span")
                                .text();
                            article[index]["accroche"] = $(element)
                                .find("div.edgtf-post-example-item-three-item > div:nth-child(2) > div:nth-child(2) > p:nth-child(1)")
                                .text();
                            article[index]["lien"] = $(element)
                                .find("div.edgtf-post-example-item-three-item > div:nth-child(1) > a:nth-child(3)")
                                .attr("href");
                            article[index]["thumbnail"] = $(element)
                                .find("div:nth-child(1) > div:nth-child(2) img")
                                .attr("data-lazy-src");
                        });

                        return resolve(article);
                    }
                 */);
            })
        );

        /* SITE EN ANGLAIS - PAS PERTINENT
        // PARALYMPIC.ORG

        promises.push(
            new Promise((resolve, reject) => {
                request(
                    "https://www.paralympic.org/goalball/news",
                    function (error, response, body) {
                        if (error) {
                            reject.send(response.statusCode);
                        }
                        let article = [];
                        let $ = cheerio.load(body);
                        $("div.view-content > div > div").each(function (index, element) {
                            article[index] = {};
                            article[index]["link"] = $(element)
                                .find("article > div > a")
                                .attr("href");
                        });

                        return resolve(article);
                    }
                );
            })
        );
        */

        // HANDISPORT/GOALBALL

        promises.push(
            new Promise((resolve, reject) => {
                request(
                    "http://www.handisport.org/?s=goalball",
                    function (error, response, body) {
                        if (error) {
                            reject.send(response.statusCode);
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

                        return resolve(article);
                    }
                );
            })
        );

        // HANDISPORT/EXPERTISE

        promises.push(
            new Promise((resolve, reject) => {
                request(
                    "https://www.handisport.org/category/expertise/",
                    function (error, response, body) {
                        if (error) {
                            reject.send(response.statusCode);
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

                        return resolve(article);
                    }
                );
            })
        );

        // REPONSE


        Promise.all(promises)
            .then((results) => {
                res.json(results);
            })
            .catch((error) => {
                console.log(error);
            });


    });


});

app.listen('3000');
console.log('API is running on http://localhost:3000'); module.exports = app;