const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
  axios.get("https://game8.co/games/Genshin-Impact/archives/297500").then(response => {
    const $ = cheerio.load(response.data);
    jsons = {
      "bannerStatus" : "current",
      "title" : $("h3.a-header--3").first().text(),
      "content" : {
        "banner1" : $("p.a-paragraph").find('img').eq(1).attr("data-src"),
        "banner2" : $("p.a-paragraph").find("img").eq(2).attr("data-src"),
       }
      }
    res.json(jsons)
  })
})

app.listen(8000, () => {
  console.log('server started');
})