const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const app = express();
const sportmag = require('./scrap-sportmag-handi');
const handisportGoalball = require('./scrap-handisport-goalball');
const handisportExpertise = require('./scrap-handisport-expertise');
app.use(cors());

var search = "natation";

let results = [];

cron.schedule('* */12 * * *', () => {
    scrapp(search);
});


function scrapp(search) {
    console.log('scrapp');
    console.log(search);
    results = [];

    sportmag(results,search);
    handisportGoalball(results);
    handisportExpertise(results);
}

app.get('/', function (req, res) {
      res.json(results);
});

app.listen('3000');
console.log('API is running on http://adrienr.promo-68.codeur.online:3000/'); module.exports = app;

scrapp();