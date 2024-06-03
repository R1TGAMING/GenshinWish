const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/genshinWish', (req, res) => {
  axios.get("https://game8.co/games/Genshin-Impact/archives/297500").then(response => {
    const $ = cheerio.load(response.data);
    jsons = {
      "bannerStatus" : "current",
      "title" : $("h3.a-header--3").first().text(),
      "content" : {
        "banner1" : $("p.a-paragraph").find('img').eq(1).attr("data-src"),
        "banner2" : $("p.a-paragraph").find("img").eq(2).attr("data-src"),
        "characterRateUp" : {
          "nameBanner1" : $("a.a-link").find("img").attr("alt"),
          "imageBanner1" : $("a.a-link").find("img").attr("data-src"),
          "nameBanner2" : $("a.a-link").find("img").eq(1).attr("alt"),
          "imageBanner2" : $("a.a-link").find("img").eq(1).attr("data-src"),
        },
        "4starCharacterRateUp" : {
          "name" : $("a.a-link").find("img").eq(2).attr("alt"),
          "image" : $("a.a-link").find("img").eq(2).attr("data-src"),
          "name2" : $("a.a-link").find("img").eq(3).attr("alt"),
          "image2" : $("a.a-link").find("img").eq(3).attr("data-src"),
          "name3" : $("a.a-link").find("img").eq(4).attr("alt"),
          "image3" : $("a.a-link").find("img").eq(4).attr("data-src")
        }
        
       }
      }
    res.json(jsons)
  })
})

app.listen(8000, () => {
  console.log('server started');
})