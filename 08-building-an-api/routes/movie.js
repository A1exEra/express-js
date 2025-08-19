const express = require("express");
const router = express.Router();

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
const movieDetails = require("../data/movieDetails");

const requireJSON = (req, res, next) => {
  if (!req.is("application/json")) {
    res.json("Content type must be application/json");
    return;
  } else {
    next();
  }
};

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get("/top_rated", (req, res, next) => {
  const page = req.query.page || 0;
  const results = movieDetails.sort((a, b) => b.vote_average - a.vote_average);
});

router.get("/:id", (req, res, next) => {
  const movieId = req.params.id;
  const movie = movieDetails.find((movie) => movie.id.toString() === movieId);
  if (!movie) {
    res.json("Movie not found.......");
    return;
  }
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", movie);
  res.render("single-movie", { title: movie.title, movie });
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

router.post("/:id/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.json("Rating must be between 0.5 and 10");
  } else {
    res.json({ msg: `Rating submitted - ${userRating}`, status_code: 200 });
  }
});
router.delete("/:id/rating", (req, res, next) => {});

module.exports = router;
