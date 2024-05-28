const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
  axios.get("https://game8.co/games/Genshin-Impact/archives/297500").then(response => {
    const $ = cheerio.load(response.data);
    jsons = {
      "status" : "current",
      "title" : $("h3.a-header--3").first().text(),
      "content" : {
        "banner1" : $("p.a-paragraph").find('img[alt="Genshin Impact - 4.6 Phase 1 Banner"]').attr("data-src"),
        "banner2" : $("p.a-paragraph").find("img[alt='Genshin - Epitome Banner 4.6 Phase 2']").attr("data-src")
       }
      }
    res.json(jsons)
  })
})

app.listen(8000, () => {
  console.log('server started');
})