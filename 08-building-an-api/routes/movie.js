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

router.get("/movie/:id", async (req, res, next) => {
  const movieId = req.params.id;
  const url = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const movie = await response.json();
    console.log(movie);
    res.render("single-movie", { title: movie.title, movie });
  } catch (err) {
    console.log("Fetch error:", err);
    res.redirect("/");
  }
});

router.get("/movie", async (req, res) => {
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

module.exports = router;
