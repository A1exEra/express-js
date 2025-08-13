const express = require("express");
let router = express.Router();

// router.use works teh same that app.use does, but it's specific to THIS router
router.use;

// instead of:
// app.get(...)
// we do:
// router.get(...)
router.get("/", (req, res, next) => {
  // res.json({
  //     msg: "Router works!"
  // })
  res.render("index", { pageTitle: "HomePage" });
});

router.get("/welcome", (req, res, next) => {
  const username = !!req.cookies.username ? req.cookies.username : "Nobody";
  res.render("welcome", {
    pageTitle: "Welcome Page",
    username,
  });
});

router.get("/story/:id", (req, res, next) => {
  const data = req.params.id;
  res.json(data);
});

// router.all
// router.post
// router.delete
// router.put...
module.exports = router;
