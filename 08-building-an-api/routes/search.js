const express = require("express");
const router = express.Router();

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get("/search", async (req, res) => {
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

router.post("/search", async (req, res, next) => {
  const searchTerm = encodeURI(req.body.movieSearch);
  const category = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${category}?query=${searchTerm}&api_key=${apiKey}`;
  let movies = [];

  try {
    const response = await fetch(movieUrl);
    if (!response.ok) {
      throw new Error("No Data Was Fetched!");
    }
    const data = await response.json();
    if (category === "person") {
      movies = await data.results[0].known_for;
    } else {
      movies = await data.results;
    }
    res.render("index", { title: "Found movies:", movies });
  } catch (err) {
    console.log("Fetch error:", err);
  }
});

module.exports = router;
