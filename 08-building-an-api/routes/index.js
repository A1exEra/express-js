const express = require("express");
const router = express.Router();

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
const movies = require("../data/movies");

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get("/", async (req, res) => {
  let movies = [];
  try {
    const response = await fetch(nowPlayingUrl);
    if (!response.ok) {
      throw new Error("No Data Was Fetched!");
    }
    const data = await response.json();
    movies = data.results || [];
  } catch (err) {
    console.log("Fetch error:", err);
  }
  res.render("index", {
    title: "Movie App",
    movies,
  });
});

router.get("/most_popular", (req, res, next) => {
  let page = req.query.page || 0;
  const indexToStart = (page - 1) * 20;
  const indexToEnd = indexToStart + 19;
  const results = movies.filter((movie) => movie.most_popular === true);
  const pagesToRender = results.slice(indexToStart, indexToEnd);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", pagesToRender.length);
  res.json({ results: pagesToRender, page });
});

module.exports = router;
