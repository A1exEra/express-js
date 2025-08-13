const path = require("path");
const rootDir = require("../../utils/path");
const express = require("express");
let router = express.Router();

function validateUser(req, res, next) {
  res.locals.validated = true;
  console.log("validated!");
  next();
}

// validateUser, is middleare that will ONLY be added to this router.
// In other words, the main router doesnt know about it
router.use(validateUser);

router.get("/", (req, res, next) => {
  res.json({
    msg: "User Router works!!",
  });
});

router.get("/login", (req, res, next) => {
  console.log(req.query);
  res.render("login", { pageTitle: "Login Page" });
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("username");
  res.redirect("/user/login");
});

router.get("/statement", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "userStatements/BankStatementChequing.png"));
  res.download(
    path.join(rootDir, "userStatements/BankStatementChequing.png"),
    "statement.png",
  );
});

router.post("/process_login", (req, res, next) => {
  console.log(req.body);
  const password = req.body.password;
  const username = req.body.username;
  if (password === "1234" && username === "Alex") {
    res.cookie("username", username);
    res.redirect("/welcome");
    return;
  }
  res.redirect("/user/login?msg=false&test=hello&username=nobody");
});

module.exports = router;
